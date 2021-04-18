const express = require('express');

const controller = require('../controllers/catalog.controller');

// Set The Express Router
const router = express.Router();

router.post('/', controller.createBook);
router.get('/', controller.getAllBook);
router.get('/:id', controller.getBookById);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

// Export the Router
module.exports = router;
