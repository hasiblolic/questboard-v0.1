const express = require('express');
const router = express.Router();

// protect routes middleware
const { protect } = require('../middleware/auth');

// importing controller functions
const {
    getFields,
    createField,
    updateField,
    deleteField
} = require('../controllers/field-controller');

// routes for getting and creating quests
router.route('/')
    .get(protect, getFields)
    .post(protect, createField);

// routes for deleting and updating quests based on id entered as param
router.route('/:id')
    .put(protect, updateField)
    .delete(protect, deleteField)


module.exports = router;