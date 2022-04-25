// custom express-async handler
const asyncHandler = require('express-async-handler');

// functions wrapped in asyncHandler to help with trycatch/asyncawait bs

const Quest = require('../models/quest-model');

// @desc    get quests from user
// @route   GET /api/quests
// @access  Private, because user should only see relevant quests
const getQuests = asyncHandler(async (req, res) => {
    // going through database and collecting all of the quests
    const quests = await Quest.find({ user: req.user.id });
    
    // returing ok status and sending all of the quests we found in database
    res.status(200).json(quests);
});

// @desc    create a new quest
// @route   POST /api/quests
// @access  Private, because you have to have a profile to create a quest
const createQuest = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        // sending 400 response (bad request) because no text was found
        res.status(400);
        throw new Error('Please add a text field');
    }

    const quest = await Quest.create({
        text: req.body.text
    });

    res.status(200).json(quest);
});

// @desc    update specified quest based on id entered in req.params.id
// @route   PUT /api/quests/:id
// @access  Private, because only the user should be able to edit a quest
const updateQuest = asyncHandler(async (req, res) => {
    const quest = await Quest.findById(req.params.id);

    if(!quest) {
        res.status(400);
        throw new Error('Quest not found');
    }

    const updatedQuest = await Quest.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedQuest);
});

// @desc    delete specified quest based on id entered in req.params.id
// @route   DELETE /api/quests/:id
// @access  Private, because only the user should be able to remove a quest
const deleteQuest = asyncHandler(async (req, res) => {
    const quest = await Quest.findByIdAndDelete(req.params.id);

    if(!quest) {
        res.status(400);
        throw new Error('Quest not found');
    }

    res.status(200).json(quest);
});

module.exports = {
    getQuests,
    createQuest,
    updateQuest,
    deleteQuest
};