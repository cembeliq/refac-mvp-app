const express = require('express');
const { authJwt } = require('../middleware');
const { handleError } = require('../utils/error');

// Set The Express Router
const router = express.Router();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

// Load The Routes
router.use('/auth', require('./auth.route'));
router.use('/catalog', [authJwt.verifyToken], require('./catalog.route'));
router.use('/category', [authJwt.verifyToken, authJwt.isAdmin], require('./category.route'));
router.use('/loan', [authJwt.verifyToken, authJwt.isAdmin], require('./loan.route'));
router.use('/finepayment', [authJwt.verifyToken], require('./finepayment.route'));
router.use('/upload', [authJwt.verifyToken, authJwt.isAdmin], require('./upload.route'));

// The 404 Route (ALWAYS Keep this as the last route)
router.use((req, res) => {
  res.status(404).json('endpoint is not found');
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  handleError(err, res);
});

// Export Router
module.exports = router;
