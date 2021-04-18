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
    emailPayload.urlVerify = `${process.env.BASE_URL}/auth/emailVerify/${Buffer.from(user.email).toString('base64')}`;

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

exports.emailVerify = (req, res) => {
  const { email } = req.params;
  const decodeEmail = Buffer.from(email, 'base64').toString('ascii');

  User.findOne({
    where: { email: decodeEmail },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ status: 'fail', message: 'User tidak ditemukan' });
    }
    if (user.email_verified_at != null) {
      return res.status(404).send({ status: 'fail', message: 'Email telah diverifikasi' });
    }

    return User.update({ email_verified_at: Date.now(), updated_at: Date.now() }, {
      where: {
        email: decodeEmail,
      },
    }).then((num) => {
      if (num > 0) {
        return res.send({ status: 'success', message: 'Update success' });
      }
      return res.status(404).send({ status: 'fail', message: `Tidak dapat update dengan email=${decodeEmail}` });
    }).catch((err) => res.status(500).send({ status: 'fail', message: err.message }));
  }).catch((err) => res.status(500).send({ status: 'fail', message: err.message }));
};
