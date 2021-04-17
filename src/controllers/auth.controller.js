const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const path = require('path');
const db = require('../models');

const User = db.user;
const sendMailRegister = require('../utils/mailer_register');

exports.register = (req, res) => {
  User.create({
    name: req.body.name,
    address: req.body.address,
    photo: req.body.photo,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  }).then((user) => {
    const emailPayload = {};

    emailPayload.email = user.email;
    emailPayload.urlVerify = `${process.env.BASE_URL}${Buffer.from(user.email).toString('base64')}`;

    sendMailRegister(emailPayload);

    return res.status(201).send({
      status: 'success',
      message: 'Registrasi berhasil, silakan cek email untuk verifikasi',
      data: {
        userId: user.id,
      },
    });
  }).catch((err) => res.status(500).send({
    status: 'fail',
    message: err.message,
  }));
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({
        status: 'fail',
        message: 'User not found',
      });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        status: 'fail',
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.send({
      status: 'success',
      message: 'User is found',
      data: {
        id: user.id,
        name: user.name,
        address: user.address,
        photo: user.photo,
        email: user.email,
        role: user.role,
        accessToken: token,
      },
    });
  });
};
