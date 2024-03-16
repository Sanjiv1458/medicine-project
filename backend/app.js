import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import productRoutes from './routes/productRoutes.js'
// import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config();

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Helmet middleware for security headers
// app.use(helmet());

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Set up static file serving
app.use(express.static(new URL('./public', import.meta.url).pathname));
app.use(express.static(new URL('./public/uploads', import.meta.url).pathname));

// Set up routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productRoutes);
// app.use('/api/v1/payment', paymentRoutes);

// Database Connection
db.on('open', () => {
  console.log('Database connected');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Port connection
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



// // Enable additional helmet features
// app.use(
//   helmet({
//     contentSecurityPolicy: false, // Allow inline scripts in development
//   })
// );

// // Use HTTPS in production
// if (process.env.NODE_ENV === 'production') {
//   app.use((req, res, next) => {
//     if (req.header('x-forwarded-proto') !== 'https') {
//       res.redirect(`https://${req.header('host')}${req.url}`);
//     } else {
//       next();
//     }
//   });
// }

// // Secure cookies
// app.use(cookieParser(process.env.COOKIE_SECRET));
