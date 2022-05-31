const express = require('express');
const router = express.Router();

// protect routes middleware
const { protect } = require('../middleware/auth');

// importing controller functions
const {
    getQuests,
    createQuest,
    updateQuest,
    deleteQuest
} = require('../controllers/quest-controller');

// routes for getting and creating quests
router.route('/')
    .get(protect, getQuests)
    .post(protect, createQuest);

// routes for deleting and updating quests based on id entered as param
router.route('/:id')
    .put(protect, updateQuest)
    .delete(protect, deleteQuest);


module.exports = router;