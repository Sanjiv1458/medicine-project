// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

class IsLoggedIn {
  static async isAuthenticated(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token not provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.id).select("-password -refreshToken");

      if (!user) {
        return res.status(401).json({ error: 'Access denied. User not found.' });
      }

      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token.' });
    }
  }
}

export default IsLoggedIn;
