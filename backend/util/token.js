import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';
export const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
};
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const generatepasswordResetToken = (payload) => {
    return crypto.randomBytes(32).toString('hex');
};