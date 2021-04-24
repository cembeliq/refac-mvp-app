/* eslint-disable no-undef */
/* eslint-disable consistent-return */
// const { client } = require('../utils/redis');
const db = require('../models');
const { success, error } = require('../utils/response-api');

const User = db.users;

const createUser = async (req, res, next) => {
  try {
    req.body.role = 'creator';
    const user = await User.create(req.body);
    const newUser = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    };

    return res.send(success('Tambah user berhasil', newUser, res.statusCode));
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (user > 0) {
      return res.send(success('Update user berhasil', { idUser: req.params.id }, res.statusCode));
    }
    return res.status(404).send(error('Update user gagal. User tidak ditemukan', res.statusCode, true));
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (user > 0) {
      return res.send(success('Hapus user berhasil', { idUser: req.params.id }, res.statusCode));
    }
    return res.status(404).send(error('Hapus user gagal. User tidak ditemukan', res.statusCode, true));
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req, res, next) => {
  let user = await cache.getAsync('user-creator-list');
  console.log('Data from cache', user);

  if (user) {
    return res.send(success('User berhasil ditemukan', { source: 'Redis', user: JSON.parse(user) }, res.statusCode));
  }
  try {
    user = await User.findAll({
      where: { role: 'creator' }, attributes: { exclude: ['password'] },
    });
    const cacheResponse = await cache.setAsync('user-creator-list', JSON.stringify(user));
    console.log(cacheResponse);
    return res.send(success('User berhasil ditemukan', { source: 'Database', user }, res.statusCode));
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ['password'] },
    });
    if (user != null) {
      return res.send(success('User berhasil ditemukan', user, res.statusCode));
    }
    return res.status(404).send(error('User tidak ditemukan', res.statusCode, true));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUserById,
};
