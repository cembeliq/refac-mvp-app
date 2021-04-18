const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

// Set The Express Router
const router = express.Router();

// Load The Routes
router.use('/auth', require('./auth.route'));
router.use('/catalog', require('./catalog.route'));

// Export Router
module.exports = router;