import doctorModel from '../models/doctorModel.js';
import { AppError } from '../middlewares/errorHandler.js';
import bcrypt from 'bcrypt';
import { validateEmail, validatePassword } from '../utils/validators.js';
import fs from 'fs';
import path from 'path';

export const getAllDoctors = async (specialization) => {
  let query = {};

  if (specialization) {
    query.specialization = specialization;
  }

  const doctors = await doctorModel.find(query).select('-password');

  return {
    success: true,
    doctors,
  };
};

export const getDoctorById = async (doctorId) => {
  const doctor = await doctorModel.findById(doctorId).select('-password');

  if (!doctor) {
    throw new AppError('Doctor not found', 404);
  }

  return {
    success: true,
    doctor,
  };
};

export const getAllSpecializations = async () => {
  const specializations = await doctorModel.distinct('specialization');

  return {
    success: true,
    specializations,
  };
};

export const addDoctor = async (doctorData, imageFile) => {
  const { name, specialization, experience, degree, about, fees } = doctorData;

  if (!name || !specialization || !experience || !degree || !about || !fees) {
    throw new AppError('All fields are required', 400);
  }

  if (!imageFile) {
    throw new AppError('Profile image is required', 400);
  }


  const imageUrl = `/uploads/${imageFile.filename}`;

  const newDoctor = await doctorModel.create({
    name,
    specialization,
    experience,
    degree,
    profileImage: imageUrl,
    about,
    fees,
  
  });

  return {
    success: true,
    message: 'Doctor added successfully',
    doctor: {
      id: newDoctor._id,
      name: newDoctor.name,
      email: newDoctor.email,
      specialization: newDoctor.specialization,
      profileImage: newDoctor.profileImage,
    },
  };
};

export const deleteDoctor = async (doctorId) => {
  const doctor = await doctorModel.findById(doctorId);

  if (!doctor) {
    throw new AppError('Doctor not found', 404);
  }

  if (doctor.profileImage) {
    const imagePath = path.join(process.cwd(), doctor.profileImage);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await doctorModel.findByIdAndDelete(doctorId);

  return {
    success: true,
    message: 'Doctor deleted successfully',
  };
};
