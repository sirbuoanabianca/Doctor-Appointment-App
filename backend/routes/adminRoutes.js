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

export default router;
