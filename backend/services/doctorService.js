import doctorModel from '../models/doctorModel.js';
import { AppError } from '../middlewares/errorHandler.js';
import bcrypt from 'bcrypt';
import { validateEmail, validatePassword } from '../utils/validators.js';
import fs from 'fs';
import path from 'path';

export const getAllDoctors = async (specialty) => {
  let query = {};

  if (specialty) {
    query.specialization = specialty;
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

export const getAllSpecialties = async () => {
  const specialties = await doctorModel.distinct('specialization');

  return {
    success: true,
    specialties,
  };
};

export const addDoctor = async (doctorData, imageFile) => {
  const { name, email, password, specialization, experience, degree, about, fees } = doctorData;

  if (!name || !email || !password || !specialization || !experience || !degree || !about || !fees) {
    throw new AppError('All fields are required', 400);
  }

  if (!imageFile) {
    throw new AppError('Profile image is required', 400);
  }

  validateEmail(email);
  validatePassword(password);

  const existingDoctor = await doctorModel.findOne({ email });
  if (existingDoctor) {
    throw new AppError('Doctor already exists with this email', 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

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

export const updateDoctor = async (doctorId, updateData, imageFile) => {
  delete updateData.password;

  if (imageFile) {
    const oldDoctor = await doctorModel.findById(doctorId);
    if (oldDoctor && oldDoctor.profileImage) {
      const oldImagePath = path.join(process.cwd(), oldDoctor.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    updateData.profileImage = `/uploads/${imageFile.filename}`;
  }

  const updatedDoctor = await doctorModel.findByIdAndUpdate(
    doctorId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedDoctor) {
    throw new AppError('Doctor not found', 404);
  }

  return {
    success: true,
    message: 'Doctor updated successfully',
    doctor: updatedDoctor,
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
