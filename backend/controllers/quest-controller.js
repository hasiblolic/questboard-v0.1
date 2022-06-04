// custom express-async handler
const asyncHandler = require('express-async-handler');
const { globalAgent } = require('http');

// functions wrapped in asyncHandler to help with trycatch/asyncawait bs

const Quest = require('../models/quest-model');
const User = require('../models/user-model');

// @desc    get quests from user
// @route   GET /api/quests
// @access  Private, because user should only see relevant quests
const getQuests = asyncHandler(async (req, res) => {
  // going through database and collecting all of the quests
  const quests = await Quest.find({ user: req.user.id });
  if(!quests) {
    res.status(400);
    throw new Error('Quests could not be found, might not be authorized');
  }
  
  // returing ok status and sending all of the quests we found in database
  res.status(200).json(quests);
});

// @desc    create a new quest
// @route   POST /api/quests
// @access  Private, because you have to have a profile to create a quest
const createQuest = asyncHandler(async (req, res) => {
  const quest = await Quest.create({
    title: req.body.title,
    creator: req.user.id,
    due: req.body.due,
    description: req.body.description,
    assignedTo: req.body.assignedTo,
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

  const user = await User.findById(req.user.id);

  // check if user exists
  if(!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // ensuring user matches quest creator
  if(quest.creator.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedQuest = await Quest.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedQuest);
});

// @desc    delete specified quest based on id entered in req.params.id
// @route   DELETE /api/quests/:id
// @access  Private, because only the user should be able to remove a quest
const deleteQuest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const quest = await Quest.findById(req.params.id);

  // check if user exists
  if(!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // ensuring user matches quest creator
  if(quest.creator.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // after all the user checks clear, try and find the quest and delete it
  const deletedQuest = await Quest.findByIdAndDelete(req.params.id);

  // quest has been deleted so we will just return the id of the quest that has been deleted
  res.status(200).json(deletedQuest);
});

module.exports = {
  getQuests,
  createQuest,
  updateQuest,
  deleteQuest
};