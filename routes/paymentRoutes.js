import express from 'express'
import { checkStatus, newPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payment', newPayment)

export default router