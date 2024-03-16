// Import necessary modules and dependencies
import Booking from "../models/booking.js";
import crypto from 'crypto';
import Razorpay from "razorpay";
import dotenv from 'dotenv'
import transporter from '../config/email.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validatePaymentInput, validateSignature } from "../utils/validation.js";
import logger from "../utils/logger.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  headers: {
    "X-Razorpay-Account": process.env.RAZORPAY_ACCOUNT,
  }
});

class PaymentController {
  static getKey = asyncHandler(async (req, res) => {
    try {
      const key_id = process.env.RAZORPAY_KEY_ID;
      res.json(new ApiResponse(200, { key: key_id }, "Razorpay key fetched successfully"));
    } catch (error) {
      logger.error(error);
      res.status(500).json(new ApiError(500, null, "Internal Server Error"));
    }
  });

  static createPayment = asyncHandler(async (req, res) => {
    try {
      const userId = req.user.id;
      const { amount, carId, slotId, startTime, endTime } = req.body;

      validatePaymentInput({ amount, carId, slotId, startTime, endTime });

      const options = {
        amount: amount,
        currency: 'INR',
        notes: {
          userId: userId,
          carId: carId,
          slotId: slotId,
          startTime: startTime,
          endTime: endTime,
        },
      };

      const order = await razorpay.orders.create(options);

      const newBooking = new Booking({
        user: userId,
        carId: carId,
        slotId: slotId,
        startTime: startTime,
        endTime: endTime,
        status: 'Pending',
      });

      await newBooking.save();

      res.json(new ApiResponse(200, order, "Payment order created successfully"));
    } catch (error) {
      logger.error(error);
      res.status(500).json(new ApiError(500, null, "Internal Server Error"));
    }
  });

  static verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (validateSignature(generated_signature, razorpay_signature)) {
      try {
        const payment = await razorpay.payments.fetch(razorpay_payment_id);

        const booking = await Booking.findOneAndUpdate(
          { carId: payment.notes.carId, status: 'Pending' },
          {
            $set: {
              slotId: payment.notes.slotId,
              status: payment.captured ? 'Booked' : 'Failed',
              razorpay_payment_id: payment.id,
              amount: payment.amount,
              captured: payment.captured,
            },
          },
          { new: true }
        );

        if (!booking) {
          logger.error('Booking not found or payment already processed');
          return res.status(400).json(new ApiError(400, null, 'Booking not found or payment already processed'));
        }

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: req.user.email,
          subject: 'Payment Confirmation',
          text: `Thank you for your payment. Your booking is confirmed.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            logger.error(error.message);
          } else {
            logger.info('Email sent: ' + info.response);
          }
        });

        res.json(new ApiResponse(200, { booking, user: req.user }, 'Payment confirmed successfully'));
      } catch (error) {
        logger.error(error);
        res.status(500).json(new ApiError(500, null, 'Internal Server Error'));
      }
    } else {
      return res.status(400).json(new ApiError(400, null, 'Webhook Signature Verification Failed'));
    }
  });

  static getPaymentHistory = asyncHandler(async (req, res) => {
    try {
      const paymentHistory = await Booking.find({ user: req.user._id });
      res.json(new ApiResponse(200, { error: null, paymentHistory }, 'Payment history fetched successfully'));
    } catch (error) {
      logger.error(error);
      res.json(new ApiResponse(500, { error: "Error fetching payment history", paymentHistory: null }, 'Internal Server Error'));
    }
  });

  static successPayment = asyncHandler(async (req, res) => {
    try {
      const booking = await Booking.findOne({ user: req.user._id }).sort({ startTime: -1 });
      res.json(new ApiResponse(200, { user: req.user, booking }, 'Payment success'));
    } catch (error) {
      logger.error(error);
      res.json(new ApiError(500, { user: req.user, booking: null }, 'Internal Server Error'));
    }
  });
};

export default PaymentController;
