// authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uid } from 'uuid';
import { DbHelper } from '../databaseHelpers';
import dotenv from 'dotenv';
import { User, Payload } from '../models/authModels';
import { registerSchema } from '../helpers';
import { sendRegistrationEmail, sendPasswordResetEmail, sendEmail } from '../nodemailer/emailService';

dotenv.config()

const dbHelper = new DbHelper()
const isAdmin = (req: Request) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return false
  try {
    const decoded: Payload = jwt.verify(token, process.env.SECRET as string) as Payload
    return decoded.role === 'Admin'
  } catch {
    return false
  }
}

const formatUserForDb = (user: User): { [key: string]: string | number } => {
  return {
    UserID: user.UserID,
    Name: user.Name,
    Email: user.Email,
    PasswordHash: user.PasswordHash,
    Role: user.Role,
    IsApproved: user.IsApproved,
    IsDeleted: user.IsDeleted
  }
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error } = registerSchema.validate(req.body)
    if (error) {
      console.error('Validation error:', error.details[0].message)
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, email, password, role } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user: User = {
      UserID: uid(),
      Name: name,
      Email: email,
      PasswordHash: hashedPassword,
      Role: role,
      IsApproved: role === 'Official' ? 0 : 1,
      IsDeleted: 0,
      CreatedAt: new Date()
    }

    console.log('User data to insert:', user);

    await dbHelper.exec('AddUser', formatUserForDb(user));

    // Send registration email
    await sendRegistrationEmail(user);

    res.status(201).json({ message: 'User successfully registered...' });
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await dbHelper.get('GetUserByEmail', { Email: email })

    if (!user) {
      return res.status(404).json({ message: 'User not found...' })
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' })
    }

    const isMatch = await bcrypt.compare(password, user.PasswordHash)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!!' })
    }

    const payload: Payload = {
      id: user.UserID,
      name: user.Name,
      role: user.Role,
      exp: Math.floor(Date.now() / 1000) + 7200,
      iat: 0
    }

    const token = jwt.sign(payload, process.env.SECRET as string)
    res.json({ token })
  } catch (err: any) {
    console.error('Error during user login:', err)
    res.status(500).json({ error: err.message || 'Internal Server Error' })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await dbHelper.getAll('GetAllUsers')
    res.json(users)
  } catch (err: any) {
    console.error('Error fetching users:', err)
    res.status(500).json({ error: err.message || 'Internal Server Error' })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    console.log(`Getting user with ID: ${userId}`)
    const user = await dbHelper.get('GetUserByID', { UserID: userId })
    if (!user) {
      console.log(`User with ID ${userId} not found`)
      return res.status(404).json({ message: `User with ID ${userId} not found` })
    }
    res.json(user)
  } catch (err:any) {
    console.error(`Error getting user: ${err}`)
    res.status(500).json({ error: `Error getting user: ${err.message}` })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, isApproved } = req.body

    const token = req.headers.authorization?.split(' ')[1]
    const isAdminUser = isAdmin(req)

    if (!isAdminUser) {
      return res.status(403).json({ message: 'Access denied: Admins only' })
    }

    const updateFields: any = { UserID: req.params.id }

    if (name) updateFields.Name = name
    if (email) updateFields.Email = email
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updateFields.PasswordHash = hashedPassword
    }
    if (role) updateFields.Role = role
    if (isApproved !== undefined) updateFields.IsApproved = isApproved ? 1 : 0

    await dbHelper.exec('UpdateUser', updateFields)

    res.json({ message: 'User successfully updated...' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const isAdminUser = isAdmin(req)

    if (!isAdminUser) {
      return res.status(403).json({ message: 'Access denied: Admins only' })
    }

    await dbHelper.exec('SoftDeleteUser', { 
      UserID: req.params.id.toString() 
    });
    res.json({ message: 'User suspended successfully' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const approveOfficial = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const isAdminUser = isAdmin(req);

    if (!isAdminUser) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const officialId = req.params.id.toString();
    await dbHelper.exec('ApproveOfficial', { UserID: officialId });

    res.json({ message: 'Official approved successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}









