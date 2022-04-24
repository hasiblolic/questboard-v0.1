const express = require('express');
const router = express.Router();
const { 
    getQuests,
    createQuest,
    updateQuest,
    deleteQuest
} = require('../controllers/quest-controller');

router.route('/')
    .get(getQuests)
    .post(createQuest);

router.route('/:id')
    .put(updateQuest)
    .delete(deleteQuest)

module.exports = router;