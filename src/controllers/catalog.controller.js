/* eslint-disable consistent-return */
const { QueryTypes } = require('sequelize');
const db = require('../models');
const { success } = require('../utils/response-api');

const Book = db.book;
const Category = db.category;
const seq = db.sequelize;

const createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).send({
      status: 'success',
      message: 'tambah buku berhasil',
      data: {
        idBook: book.id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const book = await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (book > 0) {
      return res.status(200).send({
        status: 'success',
        message: 'update buku berhasil',
        data: {
          idBook: req.params.id,
        },
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'update buku tidak berhasil. data tidak ditemukan',
      data: {
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (book > 0) {
      return res.status(200).send({
        status: 'success',
        message: 'delete buku berhasil',
        data: {
          idBook: req.params.id,
        },
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'delete buku tidak berhasil. data tidak ditemukan',
      data: {
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllBook = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: [{ model: Category }],
    });
    return res.send({
      status: 'success',
      message: 'get all data book',
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      include: [{ model: Category, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }],
    });
    if (book != null) {
      return res.send({
        status: 'success',
        message: 'get book',
        data: book,
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'get buku tidak berhasil. data tidak ditemukan',
      data: {
      },
    });
  } catch (err) {
    next(err);
  }
};

const getBookLessThan2Years = async (req, res, next) => {
  const yearNow = new Date().getFullYear();

  try {
    const books = await seq.query('SELECT a.*, b.id as `category.id`, b.name as `category.name` FROM book a join category b on a.id_category = b.id where a.year >= ? limit 20',
      {
        replacements: [yearNow - 2],
        type: QueryTypes.SELECT,
        nest: true,
      });
    return res.send(success('query berhasil', books, res.statusCode));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getAllBook,
  getBookById,
  getBookLessThan2Years,
};
