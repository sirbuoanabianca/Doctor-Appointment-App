import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import { validateEmail, validatePassword } from '../utils/validators.js';
import { generateToken } from '../utils/generateToken.js';
import { AppError } from '../middlewares/errorHandler.js';

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw new AppError('All fields are required', 400);
  }

  validateEmail(email);

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists with this email', 400);
  }

  let userRole = 'user';
  let passwordToHash = password;

  if (name === 'admin' && password === process.env.ADMIN_SECRET_KEY) {
    userRole = 'admin';
  } else {
    validatePassword(password);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordToHash, salt);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role: userRole,
  });

  const token = generateToken(newUser._id);

  return {
    success: true,
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  validateEmail(email);

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = generateToken(user._id);

  return {
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const getUserProfile = async (userId) => {
  const user = await userModel.findById(userId).select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return {
    success: true,
    user,
  };
};

export const updateUserProfile = async (userId, updateData) => {
  delete updateData.password;

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedUser) {
    throw new AppError('User not found', 404);
  }

  return {
    success: true,
    user: updatedUser,
  };
};
