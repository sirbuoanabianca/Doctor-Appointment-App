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

export const getAllPatients = async () => {
  try {
    const patients = await userModel.find({ role: 'user' });
    return {
      success: true,
      patients,
    };
  } catch (error) {
    console.error('Error fetching all patients:', error);
    throw new AppError('Failed to fetch patients', 500);
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const appointment = await appointmentModel.findByIdAndDelete(appointmentId);
    return {
      success: true,
      appointment,
    };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw new AppError('Failed to delete appointment', 500);
  }
};

export const deletePatient = async (patientId) => {
  try {
    const patient = await userModel.findByIdAndDelete(patientId);
    return {
      success: true,
      patient,
    };
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw new AppError('Failed to delete patient', 500);
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

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const appointmentsTomorrow = await appointmentModel.countDocuments({
      date: {
        $gte: tomorrow,
        $lt: dayAfterTomorrow,
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

    const appointmentsThisMonthBySpecialization = await appointmentModel.aggregate([
      {
        $match: {
          date: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor',
        },
      },
      {
        $unwind: '$doctor',
      },
      {
        $group: {
          _id: '$doctor.specialization',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $project: {
          _id: 0,
          specialization: '$_id',
          count: 1,
        },
      },
    ]);

    return {
      success: true,
      stats: {
        totalDoctors,
        totalUsers,
        appointments: {
          tomorrow: appointmentsTomorrow,
          thisWeek: appointmentsThisWeek,
          thisMonth: appointmentsThisMonth,
          total: totalAppointments,
        },
        appointmentsBySpecialization: appointmentsThisMonthBySpecialization,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new AppError('Failed to fetch dashboard statistics', 500);
  }
};
