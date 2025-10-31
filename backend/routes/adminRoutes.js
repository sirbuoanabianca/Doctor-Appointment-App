import express from 'express';
import * as doctorController from '../controllers/doctorController.js';
import * as adminController from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/stats', authMiddleware, adminMiddleware, adminController.getDashboardStats);

router.get('/appointments', authMiddleware, adminMiddleware, adminController.getAllAppointments);

router.post('/addDoctor', authMiddleware, adminMiddleware, upload.single('profileImage'), doctorController.addDoctor);

router.delete('/:id', authMiddleware, adminMiddleware, doctorController.deleteDoctor);

router.get('/appointments', authMiddleware, adminMiddleware, adminController.getAllAppointments);

router.delete('/appointment/:id', authMiddleware, adminMiddleware, adminController.deleteAppointment);

router.get('/patients', authMiddleware, adminMiddleware, adminController.getAllPatients);

router.delete('/patient/:id', authMiddleware, adminMiddleware, adminController.deletePatient);


export default router;
