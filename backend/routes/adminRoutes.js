import express from 'express';
import * as doctorController from '../controllers/doctorController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/', upload.single('profileImage'), doctorController.addDoctor);
router.put('/:id', upload.single('profileImage'), doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

export default router;
