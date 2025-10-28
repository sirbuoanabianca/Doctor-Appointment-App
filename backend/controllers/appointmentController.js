import * as appointmentService from '../services/appointmentService.js';

export const bookAppointment = async (req, res, next) => {
  try {
    const result = await appointmentService.bookAppointment(req.userId, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserAppointments = async (req, res, next) => {
  try {
    const result = await appointmentService.getUserAppointments(req.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAvailableSlots = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const { date, days } = req.query;
    const result = await appointmentService.getAvailableSlots(doctorId, date, days);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const cancelAppointment = async (req, res, next) => {
  try {
    const result = await appointmentService.cancelAppointment(req.userId, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const result = await appointmentService.getAppointmentById(req.userId, req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
