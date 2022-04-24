const express = require('express');
const router = express.Router();

// importing controller functions
const { 
    getQuests,
    createQuest,
    updateQuest,
    deleteQuest
} = require('../controllers/quest-controller');

// routes for getting and creating quests
router.route('/')
    .get(getQuests)
    .post(createQuest);

// routes for deleting and updating quests based on id entered as param
router.route('/:id')
    .put(updateQuest)
    .delete(deleteQuest)


module.exports = router;