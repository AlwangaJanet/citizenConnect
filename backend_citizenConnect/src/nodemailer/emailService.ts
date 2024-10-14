import nodemailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import mssql from 'mssql';
import cron from 'node-cron';
import path from 'path';
import crypto from 'crypto';
import { sqlConfig } from '../config';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function sendEmail(mailOptions: any) {
  await transporter.sendMail(mailOptions);
}

function getTemplatePath(templateName: string) {
  return path.join(process.cwd(), 'templates', `${templateName}.ejs`);
}

async function sendRegistrationEmail(user: any) {
  const templatePath = getTemplatePath('register');
  const template = await ejs.renderFile(templatePath, { name: user.Name, email: user.Email });
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.Email,
    subject: 'Welcome to Citizen Connect!',
    html: template
  };
  await sendEmail(mailOptions);
}

async function sendPasswordResetEmail(user: any, token: string) {
  const templatePath = getTemplatePath('forgotPass');
  const template = await ejs.renderFile(templatePath, { name: user.Name, token: token });
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.Email,
    subject: 'Password Reset Request',
    html: template
  };
  await sendEmail(mailOptions);
}

async function run() {
  try {
    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query("SELECT * FROM Users WHERE IsDeleted = 0");
    const users = result.recordset;

    for (const user of users) {
      // Send registration email
      await sendRegistrationEmail(user);

      // Call the stored procedure for password reset request
      const resetResult = await pool.request()
        .input('Email', mssql.NVarChar(100), user.Email)
        .execute('RequestPasswordReset');

      if (resetResult.recordset.length > 0) {
        const userID = resetResult.recordset[0].UserID;

        // Generate a token
        const token = crypto.randomBytes(32).toString('hex');

        // Update or insert the token into PasswordResetRequests table
        await pool.request()
          .input('UserID', mssql.Int, userID)
          .input('Token', mssql.NVarChar(100), token)
          .query(`
            IF EXISTS (SELECT 1 FROM PasswordResetRequests WHERE UserID = @UserID AND IsDeleted = 0)
            BEGIN
              UPDATE PasswordResetRequests
              SET Token = @Token, IsDeleted = 0
              WHERE UserID = @UserID AND IsDeleted = 0;
            END
            ELSE
            BEGIN
              INSERT INTO PasswordResetRequests (UserID, Token, IsDeleted)
              VALUES (@UserID, @Token, 0);
            END
          `);

        // Send password reset email
        await sendPasswordResetEmail(user, token);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Run the email service every 5 minutes
cron.schedule('*/5 * * * *', run);

export { sendRegistrationEmail, sendPasswordResetEmail, sendEmail };



