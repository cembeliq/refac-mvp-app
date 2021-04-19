const express = require('express');

const controller = require('../controllers/finepayment.controller');

// Set The Express Router
const router = express.Router();

router.post('/', controller.returnBook);

// Export the Router
module.exports = router;
