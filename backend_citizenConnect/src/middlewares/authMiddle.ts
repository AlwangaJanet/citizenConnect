import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Payload } from '../models/authModels';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface ExtendedRequest extends Request {
  info?: Payload;
}

export function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
      console.error('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload;
    console.log('Decoded token data:', decodedData);

    // Check if the token has expired
    if (decodedData.exp < Date.now() / 1000) {
      console.error('Token has expired');
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Check if the role is defined and valid
    if (!decodedData.role) {
      console.error('Role is not defined in token. Please ensure the role is included when generating the token.');
      return res.status(401).json({ message: 'Role is not defined in token. Please ensure the role is included when generating the token.' });
    } else if (!['Citizen', 'Official', 'Admin'].includes(decodedData.role)) {
      console.error(`Invalid role in token: ${decodedData.role}`);
      return res.status(403).json({ message: `Invalid role: ${decodedData.role}` });
    }

    req.info = decodedData;
    next();
  } catch (error: any) {
    console.error('Token verification error:', error);
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid Token' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
}
// Middleware to check user roles
export function checkRole(role: 'Citizen' | 'Official' | 'Admin') {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if (!req.info) {
      console.error('Unauthorized: No info in request');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userRole = req.info.role;
    if (userRole !== role) {
      console.error(`Forbidden: ${role} access required`);
      return res.status(403).json({ message: `${role} access required` });
    }

    next();
  };
}

export const isAdmin = checkRole('Admin');
export const isOfficial = checkRole('Official');
export const isCitizen = checkRole('Citizen');

// Middleware to allow user or admin access
export function isUserOrAdmin(req: ExtendedRequest, res: Response, next: NextFunction) {
  const userId = req.params.id;
  if (req.info?.role === 'Admin' || req.info?.id === userId) {
    next();
  } else {
    console.error('Forbidden: Access denied');
    res.status(403).json({ message: 'Access denied' });
  }
}