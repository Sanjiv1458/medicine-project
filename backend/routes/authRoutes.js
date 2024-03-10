// routes/authRoutes.js
import express from 'express';
import { upload } from "../middlewares/multer.middleware.js"
import IsLoggedIn from '../middlewares/auth.middleware.js';
import AuthController from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes
router.post('/refresh-token', AuthController.refreshAccessToken);
router.post('/register', upload.single('avatar'), AuthController.registerUser);
router.post('/login', AuthController.loginUser);

// Private routes (require authentication)
router.use(IsLoggedIn.isAuthenticated);
router.get('/authenticate', AuthController.authenticate);
router.post('/logout', AuthController.logoutUser);
router.post('/change-password', AuthController.changeCurrentPassword);
router.get('/current-user', AuthController.getCurrentUser);
router.put('/update-account', AuthController.updateAccountDetails);

export default router;
