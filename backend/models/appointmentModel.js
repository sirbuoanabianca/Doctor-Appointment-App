import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pay at clinic', 'payed online'],
    default: 'pay at clinic',
  },
  notes: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { minimize: false });

const appointmentModel = mongoose.models.appointment || mongoose.model('Appointment', appointmentSchema);
export default appointmentModel;
