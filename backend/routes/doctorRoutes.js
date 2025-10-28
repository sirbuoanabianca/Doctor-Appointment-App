import express from 'express';
import * as doctorController from '../controllers/doctorController.js';
import * as appointmentController from '../controllers/appointmentController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', doctorController.getAllDoctors);
router.get('/specializations', doctorController.getSpecializations);
router.get('/:id', doctorController.getDoctorById);

export default router;
