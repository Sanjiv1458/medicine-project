// controllers/admin.controller.js
import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import ProductEnquiry from '../models/query.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const AdminController = {
  homePage: (req, res) => {
    res.send('Admin Home Page');
  },

  getallUsers: async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getallMessages: async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }
    try {
      const allMessages = await Message.find();
      res.json(allMessages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateMessageStatus: async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }

    const messageId = req.params.id;
    const { viewed } = req.body;

    try {
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { $set: { viewed } },
        { new: true }
      );

      if (updatedMessage) {
        res.json(new ApiResponse(200, updatedMessage, 'Message status updated successfully'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new ApiResponse(error.status, null, error.message || 'Error updating message status'));
    }
  },

  deleteMessage: async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }

    const messageId = req.params.id;
    try {
      const deletedMessage = await Message.findByIdAndDelete(messageId);

      if (!deletedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllProductQuery: async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }
    try {
      const allProductEnquiries = await ProductEnquiry.find();
      res.json(allProductEnquiries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateQueryStatus: async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }

    const enquiryId = req.params.id;
    const { viewed } = req.body;

    try {
      const updatedQuery = await ProductEnquiry.findByIdAndUpdate(
        enquiryId,
        { $set: { viewed } },
        { new: true }
      );

      if (updatedQuery) {
        res.json(new ApiResponse(200, updatedQuery, 'Query status updated successfully'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new ApiResponse(error.status, null, error.message || 'Error updating query status'));
    }
  },

  deleteEnquiryById: async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      throw new ApiError(403, 'Permission denied. Admin access required.');
    }
    const enquiryId = req.params.id;

    try {
      const deletedEnquiry = await ProductEnquiry.findByIdAndDelete(enquiryId);

      if (!deletedEnquiry) {
        return res.status(404).json({ error: 'Enquiry not found' });
      }

      res.json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default AdminController;
