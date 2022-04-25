const express = require('express');
const router = express.Router();

// importing controller functions
const { 
    login,
    register,
    profile
} = require('../controllers/user-controller');

const { protect } = require('../middleware/auth');

// routes for getting and creating quests
router.post('/login', login);
router.post('/register', register);
router.get('/profile', protect, profile);

module.exports = router;