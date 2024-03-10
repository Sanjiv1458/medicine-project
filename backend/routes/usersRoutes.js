// routes/userRoutes.js
import express from 'express';
import UserController from '../controllers/user.contoller.js';
import IsLoggedIn from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.use(IsLoggedIn.isAuthenticated);

// User data routes
router.get('/user/:id', UserController.getUserData);
router.put('/user/:id', UserController.updateUserProfile);

// User messages routes
router.get('/user/:id/messages', UserController.getUserMessages);
router.post('/user/:id/messages', UserController.submitUserMessage);
router.get('/user/messages/:messageId', UserController.getMessageById);

// Product queries routes
router.get('/user/:id/queries', UserController.getAllProductsQueries);
router.post('/user/:id/queries', UserController.submitProductQuery);
router.get('/user/queries/:queryId', UserController.getProductQueriesById);

export default router;
