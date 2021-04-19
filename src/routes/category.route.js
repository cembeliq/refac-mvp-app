const express = require('express');

const controller = require('../controllers/category.controller');

// Set The Express Router
const router = express.Router();

router.post('/', controller.createCategory);
router.get('/', controller.getAllCategory);
router.get('/:id', controller.getCategoryById);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

// The 404 Route (ALWAYS Keep this as the last route)
router.get('*', (req, res) => {
  res.send('what???', 404);
});

// Export the Router
module.exports = router;
