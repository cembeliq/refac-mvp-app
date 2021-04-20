const { QueryTypes } = require('sequelize');
const db = require('../models');

const Book = db.book;
const Category = db.category;
const seq = db.sequelize;

const createBook = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateBook = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteBook = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const getAllBook = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const getBookById = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const getBookLessThan2Years = async (req, res) => {
  const yearNow = new Date().getFullYear();

  try {
    const books = await seq.query('SELECT a.*, b.id as `category.id`, b.name as `category.name` FROM book a join category b on a.id_category = b.id where a.year >= ? limit 20',
      {
        replacements: [yearNow - 2],
        type: QueryTypes.SELECT,
        nest: true,
      });
    return res.send({ status: 'success', message: 'query berhasil', data: books });
  } catch (err) {
    return res.send({ status: 'fail', message: err.message });
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
