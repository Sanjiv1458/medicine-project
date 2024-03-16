// routes/paymentRoutes.js
import express from 'express';
import PaymentController from '../controllers/payment.controller.js';
import IsLoggedIn from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes
router.use(IsLoggedIn.isAuthenticated);
router.get('/get-key', PaymentController.getKey);
router.post('/create-payment', PaymentController.createPayment);
router.post('/verify-payment', PaymentController.verifyPayment);
router.get('/payment-history', PaymentController.getPaymentHistory);
router.get('/success-payment', PaymentController.successPayment);

export default router;
