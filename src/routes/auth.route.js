const express = require('express');

const controller = require('../controllers/auth.controller');

// Set The Express Router
const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/emailVerify/:email', controller.emailVerify);

// Export the Router
module.exports = router;
