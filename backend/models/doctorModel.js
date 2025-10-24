import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  }
}, {minimize: false});

const doctorModel = mongoose.models.doctor || mongoose.model('Doctor', doctorSchema);
export default doctorModel;