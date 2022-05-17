const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/user-model');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // making sure the authorization header starts with Bearer
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header - split takes a string and makes an array before the space and after a space
      // will be example: 'Bearer 1fj839fj8934j349' ['Bearer', '1fj839fj8934j349']
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token and passing user into the request
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('User not authorized');
    }
  }
})

module.exports = { protect };