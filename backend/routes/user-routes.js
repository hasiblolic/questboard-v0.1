const express = require('express');
const router = express.Router();

// importing controller functions
const { 
  signin,
  signup,
  profile,
  signinWithGoogle,
  signupWithGoogle,
  updatePhoto,
} = require('../controllers/user-controller');

const { protect } = require('../middleware/auth');

// routes for getting and creating quests
router.post('/signin', signin);
router.post('/signin-with-google', signinWithGoogle);
router.post('/signup', signup);
router.post('/signup-with-google', signupWithGoogle);
router.put('/profile/photo/:id', protect, updatePhoto);
router.get('/profile', protect, profile);

module.exports = router;