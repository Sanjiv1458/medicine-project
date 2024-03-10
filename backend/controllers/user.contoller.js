// controllers/user.controller.js
import User from "../models/user.model.js";
import ProductEnquiry from "../models/query.model.js";
import Message from "../models/message.model.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

class UserController {
  static getUserData = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const userData = await User.findById(userId);
    if (!userData) {
      throw new ApiError(404, 'User not found');
    }
    res.json(new ApiResponse(200, userData, 'User data fetched successfully'));
  });

  static updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
    const updatedUserProfile = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUserProfile) {
      throw new ApiError(404, 'User not found');
    }
    res.json(new ApiResponse(200, updatedUserProfile, 'User profile updated successfully'));
  });

  static getUserMessages = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.json(new ApiResponse(200, user.messages, 'User messages fetched successfully'));
  });

  static submitUserMessage = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const messageData = req.body;
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const newMessage = await Message.create(messageData);
    user.messages.push(newMessage._id);

    await user.save();
    res.json(new ApiResponse(201, newMessage, 'User message submitted successfully'));
  });

  static getMessageById = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;
    const message = await Message.findById(messageId);
    if (!message) {
      throw new ApiError(404, 'Message not found');
    }
    res.json(new ApiResponse(200, message, 'Message fetched successfully'));
  });

  static submitProductQuery = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const queryData = req.body;
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const newQuery = await ProductEnquiry.create(queryData);
    user.productQueries.push(newQuery._id);

    await user.save();
    res.json(new ApiResponse(201, newQuery, 'Product query submitted successfully'));
  });

  static getAllProductsQueries = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.json(new ApiResponse(200, user.productQueries, 'All product queries fetched successfully'));
  });

  static getProductQueriesById = asyncHandler(async (req, res) => {
    const queryId = req.params.queryId;
    const query = await ProductEnquiry.findById(queryId);
    if (!query) {
      throw new ApiError(404, 'Product query not found');
    }
    res.json(new ApiResponse(200, query, 'Product query fetched successfully'));
  });
}

export default UserController;
