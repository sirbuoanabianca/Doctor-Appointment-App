import * as doctorService from '../services/doctorService.js';

export const getAllDoctors = async (req, res, next) => {
  try {
    const { specialty } = req.query;
    const result = await doctorService.getAllDoctors(specialty);
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

export const getSpecialties = async (req, res, next) => {
  try {
    const result = await doctorService.getAllSpecialties();
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

export const updateDoctor = async (req, res, next) => {
  try {
    const result = await doctorService.updateDoctor(req.params.id, req.body, req.file);
    res.status(200).json(result);
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
