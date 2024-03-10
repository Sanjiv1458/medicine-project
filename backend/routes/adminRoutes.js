// Import necessary modules and controllers
import express from 'express';
import adminController from '../controllers/admin.controller.js';
import isLoggedIn from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', isLoggedIn.isAuthenticated, adminController.homePage);
router.get('/customers', isLoggedIn.isAuthenticated, adminController.getallUsers);

//messages
router.get('/messages', isLoggedIn.isAuthenticated, adminController.getallMessages);
router.patch('/messages/:id/updateMessageStatus', isLoggedIn.isAuthenticated, adminController.updateMessageStatus);
router.delete('/messages/:id', isLoggedIn.isAuthenticated, adminController.deleteMessage);

//enquiry
router.get('/enquiries', isLoggedIn.isAuthenticated, adminController.getAllProductQuery);
router.patch('/enquiries/:id/updateQueryStatus', isLoggedIn.isAuthenticated, adminController.updateQueryStatus);
router.delete('/enquiries/:id', isLoggedIn.isAuthenticated, adminController.deleteEnquiryById);

export default router;
