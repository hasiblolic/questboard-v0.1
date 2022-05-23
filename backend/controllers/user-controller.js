// functions wrapped in asyncHandler to help with trycatch/asyncawait bs
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user-model');

// @desc    Authenticate a user
// @route   POST /api/users/signin
// @access  Public
const signin = asyncHandler(async (req, res) => {
    // pulling out email and password from request
    const { email, password } = req.body;

    // doing some validation
    if(!email) {
        res.status(400);
        throw new Error('Please enter your email');
    }

    if(!password) {
      res.status(400);
      throw new Error('Please enter your password');
    }

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            displayName: user.displayName,
            email: user.email,
            token: generateJWT(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

const signinWithGoogle = asyncHandler(async (req, res) => {
  // pulling out email and password from request
  const { email } = req.body;

  const user = await User.findOne({ email });

  if(user) {
    res.json({
      _id: user.id,
      displayName: user.displayName,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Your acount could not be found, did you want to sign up?');
  }
});


// @desc    create a new user
// @route   POST /api/users/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
    const { email, password, displayName } = req.body;

    // validate that all fields are filled out
    if(!email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // check if user exists already
    const userExists = await User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error('User already registered, did you want to sign in?');
    }

    // user not found and all fields filled out so go ahead and create a new user
    // starting by hashing password - create salt first
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        displayName,
        email,
        password: hashedPassword,
    });

    // verify user was successfully created and respond with 201
    if(user) {
        res.status(201).json({
            _id: user.id,
            displayName: user.displayName,
            email: user.email,
            token: generateJWT(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    create a new user
// @route   POST /api/users/signup
// @access  Public
const signupWithGoogle = asyncHandler(async (req, res) => {
  const { email, displayName } = req.body;

  // validate that all fields are filled out
  if(!email) {
      res.status(400);
      throw new Error('Missing email');
  }

  // check if user exists already
  const userExists = await User.findOne({ email });

  if(userExists) {
      res.status(400);
      throw new Error('User already registered, did you want to sign in?');
  }

  // existing user not found and all fields filled out so go ahead and create a new user
  // create user
  const user = await User.create({
      displayName,
      email,
  });

  // verify user was successfully created and respond with 201
  if(user) {
      res.status(201).json({
          _id: user.id,
          displayName: user.displayName,
          email: user.email,
          token: generateJWT(user._id)
      });
  } else {
      res.status(400);
      throw new Error('Invalid user data');
  }
});

// @desc    see user's specific information/profile
// @route   GET /api/users/profile
// @access  Private, because only the user should be able to see their information
const profile = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});

// Generate JWT
const generateJWT = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

module.exports = {
    signin,
    signup,
    signinWithGoogle,
    signupWithGoogle,
    profile
};