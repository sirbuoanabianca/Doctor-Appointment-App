import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
import { AppError } from '../middlewares/errorHandler.js';

export const bookAppointment = async (userId, appointmentData) => {
  const { doctorId, date, time, notes } = appointmentData;

  if (!doctorId || !date || !time) {
    throw new AppError('Doctor, date, and time are required', 400);
  }

  const doctor = await doctorModel.findById(doctorId);
  if (!doctor) {
    throw new AppError('Doctor not found', 404);
  }

  const user = await userModel.findById(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const existingAppointment = await appointmentModel.findOne({
    doctorId,
    date: new Date(date),
    time,
  });

  if (existingAppointment) {
    throw new AppError('This time slot is already booked', 400);
  }

  const appointment = await appointmentModel.create({
    userId,
    doctorId,
    date: new Date(date),
    time,
    notes: notes || '',
  });

  const populatedAppointment = await appointmentModel
    .findById(appointment._id)
    .populate('doctorId', 'name specialization fees')
    .populate('userId', 'name email phone');

  return {
    success: true,
    message: 'Appointment booked successfully',
    appointment: populatedAppointment,
  };
};

export const getUserAppointments = async (userId) => {
  const appointments = await appointmentModel
    .find({ userId })
    .populate('doctorId', 'name specialization fees profileImage')
    .sort({ date: -1 });

  return {
    success: true,
    appointments,
  };
};

export const getAvailableSlots = async (doctorId, startDate, days = 30) => {
  if (!doctorId || !startDate) {
    throw new AppError('Doctor ID and start date are required', 400);
  }

  const doctor = await doctorModel.findById(doctorId);
  if (!doctor) {
    throw new AppError('Doctor not found', 404);
  }

  const allSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30',
  ];

  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(end.getDate() + days);

  const bookedAppointments = await appointmentModel.find({
    doctorId,
    date: { $gte: start, $lt: end },
  }).select('date time');

  const slotsByDate = {};

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + i);
    const dateString = currentDate.toISOString().split('T')[0];

    const bookedSlotsForDate = bookedAppointments
      .filter(app => {
        const appDate = new Date(app.date).toISOString().split('T')[0];
        return appDate === dateString;
      })
      .map(app => app.time);

    const availableSlots = allSlots.filter(slot => !bookedSlotsForDate.includes(slot));

    slotsByDate[dateString] = {
      date: dateString,
      availableSlots,
      bookedSlots: bookedSlotsForDate,
    };
  }

  return {
    success: true,
    days,
    slots: slotsByDate,
  };
};



export const cancelAppointment = async (userId, appointmentId) => {
  const appointment = await appointmentModel.findById(appointmentId);

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  if (appointment.userId.toString() !== userId) {
    throw new AppError('Not authorized to cancel this appointment', 403);
  }

  await appointmentModel.findByIdAndDelete(appointmentId);

  return {
    success: true,
    message: 'Appointment cancelled successfully',
  };
};

export const getAppointmentById = async (userId, appointmentId) => {
  const appointment = await appointmentModel
    .findById(appointmentId)
    .populate('doctorId', 'name specialization fees profileImage')
    .populate('userId', 'name email phone');

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  if (appointment.userId._id.toString() !== userId) {
    throw new AppError('Not authorized to view this appointment', 403);
  }

  return {
    success: true,
    appointment,
  };
};
