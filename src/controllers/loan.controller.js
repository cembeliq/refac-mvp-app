const { Op } = require('sequelize');
const db = require('../models');

const Loan = db.loan;

const createLoan = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateLoan = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const deleteLoan = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const getAllLoan = async (req, res) => {
  try {
    const books = await Loan.findAll({});
    return res.send({
      status: 'success',
      message: 'get all data loan',
      data: books,
    });
  } catch (err) {
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const getLoanById = async (req, res) => {
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
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  createLoan,
  updateLoan,
  deleteLoan,
  getAllLoan,
  getLoanById,
};
