import Stripe from 'stripe';
import appointmentModel from '../models/appointmentModel.js';
import { AppError } from '../middlewares/errorHandler.js';

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    const appointment = await appointmentModel
      .findById(appointmentId)
      .populate('doctorId', 'name fees');

    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }

    if (appointment.userId.toString() !== userId) {
      throw new AppError('Not authorized', 403);
    }

    if (appointment.paymentStatus === 'payed online') {
      throw new AppError('Appointment already paid', 400);
    }


    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: appointment.doctorId.fees * 100, 
      currency: 'ron',
      metadata: {
        appointmentId: appointmentId,
        userId: userId,
        doctorName: appointment.doctorId.name,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      appointmentId: appointmentId,
      amount: appointment.doctorId.fees,
    });
  } catch (error) {
    next(error);
  }
};

export const confirmPayment = async (req, res, next) => {
  try {
    const { paymentIntentId, appointmentId } = req.body;
    const userId = req.userId;

    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      throw new AppError('Payment not completed', 400);
    }

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new AppError('Appointment not found', 404);
    }

    if (appointment.userId.toString() !== userId) {
      throw new AppError('Not authorized', 403);
    }

    appointment.paymentStatus = 'payed online';
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully',
      appointment,
    });
  } catch (error) {
    next(error);
  }
};
