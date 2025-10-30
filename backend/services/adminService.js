import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
import { AppError } from '../middlewares/errorHandler.js';

export const getAllAppointments = async () => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate('doctorId', 'name specialization fees profileImage')
      .populate('userId', 'name email phone')
      .sort({ date: -1, time: -1 });

    return {
      success: true,
      appointments,
    };
  } catch (error) {
    console.error('Error fetching all appointments:', error);
    throw new AppError('Failed to fetch appointments', 500);
  }
};

export const getDashboardStats = async () => {
  try {
    const totalDoctors = await doctorModel.countDocuments();

    const totalUsers = await userModel.countDocuments({ role: { $ne: 'admin' } });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1); 

    const appointmentsToday = await appointmentModel.countDocuments({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const appointmentsThisWeek = await appointmentModel.countDocuments({
      date: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    });

    const appointmentsThisMonth = await appointmentModel.countDocuments({
      date: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    const totalAppointments = await appointmentModel.countDocuments();

    return {
      success: true,
      stats: {
        totalDoctors,
        totalUsers,
        appointments: {
          today: appointmentsToday,
          thisWeek: appointmentsThisWeek,
          thisMonth: appointmentsThisMonth,
          total: totalAppointments,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new AppError('Failed to fetch dashboard statistics', 500);
  }
};
