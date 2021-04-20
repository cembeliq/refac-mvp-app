const express = require('express');
const { authJwt } = require('../middleware');

const controller = require('../controllers/catalog.controller');

// Set The Express Router
const router = express.Router();

router.post('/', [authJwt.isAdmin], controller.createBook);
router.get('/newest', [authJwt.isAdmin], controller.getBookLessThan2Years);
router.get('/', controller.getAllBook);
router.get('/:id', [authJwt.isAdmin], controller.getBookById);
router.put('/:id', [authJwt.isAdmin], controller.updateBook);
router.delete('/:id', [authJwt.isAdmin], controller.deleteBook);

// Export the Router
module.exports = router;
