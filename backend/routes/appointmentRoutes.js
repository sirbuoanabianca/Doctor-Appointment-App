import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/bookAppointment', authMiddleware, appointmentController.bookAppointment);
router.get('/user', authMiddleware, appointmentController.getUserAppointments);
router.get('/slots/:doctorId', appointmentController.getAvailableSlots); 
router.put('/:id/cancel', authMiddleware, appointmentController.cancelAppointment);
router.get('/:id', authMiddleware, appointmentController.getAppointmentById);

export default router;
