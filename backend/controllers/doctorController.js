import * as doctorService from '../services/doctorService.js';

export const getAllDoctors = async (req, res, next) => {
  try {
    const { specialization } = req.query;
    const result = await doctorService.getAllDoctors(specialization);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req, res, next) => {
  try {
    const result = await doctorService.getDoctorById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getSpecializations = async (req, res, next) => {
  try {
    const result = await doctorService.getAllSpecializations();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const addDoctor = async (req, res, next) => {
  try {
    const result = await doctorService.addDoctor(req.body, req.file);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const result = await doctorService.deleteDoctor(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
