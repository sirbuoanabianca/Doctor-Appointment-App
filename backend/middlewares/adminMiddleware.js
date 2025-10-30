import { AppError } from './errorHandler.js';
import userModel from '../models/userModel.js';

export const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const user = await userModel.findById(req.userId).select('role');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
