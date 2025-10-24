import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized. Please login.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
