const express = require('express');
const { authJwt } = require('../middleware');
const controller = require('../controllers/finepayment.controller');

// Set The Express Router
const router = express.Router();

router.post('/', [authJwt.isAdmin], controller.returnBook);
router.get('/historyLoan', controller.getHistoryLoan);

// Export the Router
module.exports = router;
