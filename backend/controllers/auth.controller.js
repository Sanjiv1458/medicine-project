// Import necessary modules and dependencies
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Define cookie options for token storage
const cookieOptions = {
  httpOnly: true,
  secure: false,
};

// Function to generate access and refresh tokens for a user
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw new ApiError(500, "Error generating tokens");
  }
};


// Function to handle image upload using Cloudinary
const handleImageUpload = async (file) => {
  try {
    if (!file || (Array.isArray(file) && file.length === 0) || !file.path) {
      throw new ApiError(400, "File is required");
    }

    const localFilePath = Array.isArray(file) ? file[0].path : file.path;

    const response = await uploadOnCloudinary(localFilePath);

    if (response && response.url) {
      return response;
    } else {
      throw new ApiError(500, "Error uploading file to Cloudinary");
    }
  } catch (error) {
    console.error("Error handling image upload:", error);
    throw error;
  }
};

class AuthController {
  // Controller to authenticate initially
  static authenticate = asyncHandler(async (req, res) => {
    try {
      if (!req.user) {
        throw new ApiError(401, "User not authenticated");
      }
      return res.json(new ApiResponse(200, { user: req.user }, "Authentication successful"));
    } catch (error) {
      return res.status(error.status || 500).json(new ApiResponse(error.status || 500, null, error.message || "Authentication failed"));
    }
  });

  // Controller to register a new user
  static registerUser = asyncHandler(async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      if (![fullName, email, password].every((field) => field?.trim() !== "")) {
        throw new ApiError(400, "All fields are required");
      }

      const existedUser = await User.findOne({ email });

      if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
      }

      const avatar = await handleImageUpload(req.file);

      const user = await User.create({
        fullName: fullName,
        avatar: avatar.url,
        email: email,
        password: password,
      });

      if (!user) {
        console.error("Error creating the user. User not found.");
        throw new ApiError(500, "Error creating the user");
      }

      const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user._id);

      await user.save({ validateBeforeSave: false });

      return res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User registered successfully"));
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(error.status || 500).json(new ApiResponse(error.status || 500, null, error.message || "Registration failed"));
    }
  });

  // Controller to handle user login
  static loginUser = asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw new ApiError(400, "email is required");
      }

      const user = await User.findOne({ email });

      if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid user credentials");
      }

      const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

      const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

      res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
    } catch (error) {
      console.error("Login error:", error);
      return res.status(error.status || 500).
        json(new ApiResponse(error.status || 500, null, error.message || "Login failed"));
    }
  });

  static logoutUser = asyncHandler(async (req, res) => {
    try {
      await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
      );
      return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200)
        .json(new ApiResponse(200, {}, "User logged out"));
    } catch (error) {
      console.error('Logout error:', error);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "An error occurred during logout"));
    }
  });

  // Controller to refresh access token using refresh token
  static refreshAccessToken = asyncHandler(async (req, res) => {
    try {
      const incomingRefreshToken = req.cookies.refreshToken;
      if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
      }

      try {
        const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        const userId = decodedToken?.id;

        const user = await User.findById(userId);

        if (!user || incomingRefreshToken !== user?.refreshToken) {
          console.error("User not found or invalid refresh token");
          throw new ApiError(401, "Invalid refresh token");
        }

        const isAccessTokenExpired = user.isAccessTokenExpired(req.cookies.accessToken);

        if (isAccessTokenExpired) {
          const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

          user.refreshToken = refreshToken;
          await user.save({ validateBeforeSave: false });

          return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
        } else {
          return res
            .status(200)
            .json(new ApiResponse(200, { message: "Access token is still valid", user: req.user }));
        }
      } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
      }
    } catch (error) {
      throw error;
    }
  });

  // Controller to change the user's password
  static changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
  });

  // Controller to get the current user
  static getCurrentUser = asyncHandler(async (req, res) => {
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "User fetched successfully"));
  });

  // Controller to update account details
  static updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email, avatar } = req.body;

    if (!fullName || !email) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          fullName,
          email,
          avatar,
        },
      },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Account details updated successfully"));
  });
}

export default AuthController;