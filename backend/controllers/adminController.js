import * as adminService from '../services/adminService.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const result = await adminService.getDashboardStats();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllAppointments = async (req, res, next) => {
  try {
    const result = await adminService.getAllAppointments();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllPatients = async (req, res, next) => {
  try {
    const result = await adminService.getAllPatients();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const result = await adminService.deleteAppointment(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (req, res, next) => {
  try {
    const result = await adminService.deletePatient(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};