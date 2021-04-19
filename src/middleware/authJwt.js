const jwt = require('jsonwebtoken');
const db = require('../models');

const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided',
    });
  }

  return jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    return next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    console.log(user.role);
    if (user.role === 'admin') {
      return next();
    }

    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  });
};

module.exports = { verifyToken, isAdmin };