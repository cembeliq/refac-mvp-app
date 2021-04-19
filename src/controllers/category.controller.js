const db = require('../models');

const Category = db.category;

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).send({
      status: 'success',
      message: 'tambah kategori berhasil',
      data: {
        idCategory: category.id,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (category > 0) {
      return res.status(200).send({
        status: 'success',
        message: 'update kategori berhasil',
        data: {
          idCategory: req.params.id,
        },
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'update kategori tidak berhasil. data tidak ditemukan',
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

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (category > 0) {
      return res.status(200).send({
        status: 'success',
        message: 'delete kategori berhasil',
        data: {
          idCategory: req.params.id,
        },
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'delete kategori tidak berhasil. data tidak ditemukan',
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

const getAllCategory = async (req, res) => {
  try {
    const books = await Category.findAll({});
    return res.send({
      status: 'success',
      message: 'get all data category',
      data: books,
    });
  } catch (err) {
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (category != null) {
      return res.send({
        status: 'success',
        message: 'get kategori',
        data: category,
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'get kategori tidak berhasil. data tidak ditemukan',
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

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
};
