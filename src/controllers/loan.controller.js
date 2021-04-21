/* eslint-disable consistent-return */
const { Op } = require('sequelize');
const db = require('../models');

const Loan = db.loan;

const createLoan = async (req, res, next) => {
  const { borrowedDate } = req.body;
  const nDate = new Date(borrowedDate);
  try {
    const countBorrowed = await Loan.count({
      where: {
        [Op.and]: [{ idUser: req.body.idUser }, { borrowedDate: nDate.toUTCString() }],
      },
    });
    console.log(countBorrowed);
    if (countBorrowed >= 3) {
      return res.status(403).send({
        status: 'fail',
        message: 'Maaf pinjaman anda sudah maksimal',
      });
    }
    const loan = await Loan.create(req.body);
    return res.status(201).send({
      status: 'success',
      message: 'tambah pinjaman berhasil',
      data: {
        idLoan: loan.id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateLoan = async (req, res, next) => {
  try {
    const loan = await Loan.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (loan > 0) {
      return res.status(200).send({
        status: 'success',
        message: 'update pinjaman berhasil',
        data: {
          idLoan: req.params.id,
        },
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'update pinjaman tidak berhasil. data tidak ditemukan',
      data: {
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteLoan = async (req, res, next) => {
  try {
    const loan = await Loan.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (loan > 0) {
      return res.status(200).send({
        status: 'success',
        message: 'delete pinjaman berhasil',
        data: {
          idLoan: req.params.id,
        },
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'delete pinjaman tidak berhasil. data tidak ditemukan',
      data: {
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllLoan = async (req, res, next) => {
  try {
    const books = await Loan.findAll({});
    return res.send({
      status: 'success',
      message: 'get all data loan',
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

const getLoanById = async (req, res, next) => {
  try {
    const loan = await Loan.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (loan != null) {
      return res.send({
        status: 'success',
        message: 'get pinjaman',
        data: loan,
      });
    }
    return res.status(404).send({
      status: 'fail',
      message: 'get pinjaman tidak berhasil. data tidak ditemukan',
      data: {
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLoan,
  updateLoan,
  deleteLoan,
  getAllLoan,
  getLoanById,
};
