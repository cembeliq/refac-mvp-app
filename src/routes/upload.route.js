const express = require('express');
const upload = require('../middleware/upload');

const controller = require('../controllers/upload.controller');

// Set The Express Router
const router = express.Router();

router.post('/:id', upload.single('file'), controller.uploadFile);

// Export the Router
module.exports = router;
