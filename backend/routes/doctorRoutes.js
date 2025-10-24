import express from 'express';
import * as doctorController from '../controllers/doctorController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.get('/', doctorController.getAllDoctors);
router.get('/specialties', doctorController.getSpecialties);
router.get('/:id', doctorController.getDoctorById);

export default router;
