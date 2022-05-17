// custom express-async handler
const asyncHandler = require('express-async-handler');
const { globalAgent } = require('http');

// functions wrapped in asyncHandler to help with trycatch/asyncawait bs

const Field = require('../models/field-model');
const User = require('../models/user-model');

// @desc    get field from user
// @route   GET /api/field
// @access  Private, because user should only see relevant field
const getFields = asyncHandler(async (req, res) => {
    // going through database and collecting all of the quests
    const field = await Field.find({ user: req.user.id });
    
    // returing ok status and sending all of the quests we found in database
    res.status(200).json(field);
});

// @desc    create a new field
// @route   POST /api/field
// @access  Private, because you have to have a profile to create a field
const createField = asyncHandler(async (req, res) => {
    if(!req.body.title) {
        // sending 400 response (bad request) because no text was found
        res.status(400);
        throw new Error('Please add a title');
    }

    const field = await Field.create({
        title: req.body.title,
        user: req.user.id,
        options: req.body.options,
    });

    res.status(200).json(field);
});

// @desc    update specified field based on id entered in req.params.id
// @route   PUT /api/quests/:id
// @access  Private, because only the user should be able to edit a field
const updateField = asyncHandler(async (req, res) => {
    const field = await Field.findById(req.params.id);

    if(!field) {
        res.status(400);
        throw new Error('Field not found');
    }

    const user = await User.findById(req.user.id);

    // check if user exists
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // ensuring user matches field creator
    if(field.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedField = await Field.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedField);
});

// @desc    delete specified field based on id entered in req.params.id
// @route   DELETE /api/quests/:id
// @access  Private, because only the user should be able to remove a field
const deleteField = asyncHandler(async (req, res) => {
    const field = await Field.findById(req.params.id);

    if(!field) {
        res.status(400);
        throw new Error('Field not found');
    }

    const user = await User.findById(req.user.id);

    // check if user exists
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // ensuring user matches field creator
    if(field.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await field.remove();

    res.status(200).json(req.params.id);
});

module.exports = {
    getFields,
    createField,
    updateField,
    deleteField
};