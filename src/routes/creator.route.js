const express = require('express');
const { authJwt } = require('../middleware');

const controller = require('../controllers/creator.controller');

// Set The Express Router
const router = express.Router();

router.post('/', [authJwt.isAdmin], controller.createUser);
// router.get('/newest', [authJwt.isAdmin], controller.getBookLessThan2Years);
router.get('/', [authJwt.isAdmin], controller.getAllUser);
// router.get('/:id', [authJwt.isAdmin], controller.getBookById);
router.put('/:id', [authJwt.isAdmin], controller.updateUser);
router.delete('/:id', [authJwt.isAdmin], controller.deleteUser);

// Export the Router
module.exports = router;
