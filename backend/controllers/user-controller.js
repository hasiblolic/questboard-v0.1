// functions wrapped in asyncHandler to help with trycatch/asyncawait bs
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user-model');

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    // pulling out email and password from request
    const { email, password } = req.body;

    // doing some validation
    if(!email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    create a new user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    // validate that all fields are filled out
    if(!email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    // check if user exists already
    const userExists = User.findOne({ email });

    if(userExists) {
        res.status(400);
        throw new Error('User already registered, did you want to login?');
    }

    // user not found and all fields filled out so go ahead and create a new user
    // starting by hashing password - create salt first
    const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        token: generateJWT(user._id),
    });

    // verify user was successfully created and respond with 201
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
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
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    })
});

// Generate JWT
const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    login,
    register,
    profile
};