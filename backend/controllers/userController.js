import * as userService from '../services/userService.js';

export const register = async (req, res, next) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await userService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const result = await userService.getUserProfile(req.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const result = await userService.updateUserProfile(req.userId, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
