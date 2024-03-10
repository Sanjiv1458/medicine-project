import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  avatar: {
    type: String, // cloudinary url
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  refreshToken: { type: String },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  productQueries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductEnquiry',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const saltRounds = process.env.SALT_ROUNDS || 10;
    const salt = await bcrypt.genSalt(parseInt(saltRounds, 10));
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign({
    id: this._id,
    email: this.email,
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  return accessToken;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({
    id: this._id,
  }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return refreshToken;
};

userSchema.methods.isAccessTokenExpired = function (accessToken) {
  try {
    const decodedToken = jwt.decode(accessToken);

    if (!decodedToken || !decodedToken.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
    console.log(error);
  }
};

const User = mongoose.model('User', userSchema);

export default User;
