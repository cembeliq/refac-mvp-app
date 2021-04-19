const express = require('express');

const controller = require('../controllers/loan.controller');

// Set The Express Router
const router = express.Router();

router.post('/', controller.createLoan);
router.get('/', controller.getAllLoan);
router.get('/:id', controller.getLoanById);
router.put('/:id', controller.updateLoan);
router.delete('/:id', controller.deleteLoan);

// Export the Router
module.exports = router;
