import express from 'express';
import { createPaymentIntent, confirmPayment } from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-intent', authMiddleware, createPaymentIntent);

router.post('/confirm', authMiddleware, confirmPayment);

export default router;
