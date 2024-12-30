const express = require('express');
const { handleSignUpUser, handleLoginUser } = require('../controllers/user')

const router = express.Router();

router.post('/', handleSignUpUser);
router.post('/login', handleLoginUser);

module.exports = router;