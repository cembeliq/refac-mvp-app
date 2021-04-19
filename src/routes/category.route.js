const express = require('express');

const controller = require('../controllers/category.controller');

// Set The Express Router
const router = express.Router();

router.post('/', controller.createCategory);
router.get('/', controller.getAllCategory);
router.get('/:id', controller.getCategoryById);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

// Export the Router
module.exports = router;
