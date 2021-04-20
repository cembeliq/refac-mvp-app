const { QueryTypes } = require('sequelize');
const db = require('../models');

const Loan = db.loan;
const FinePayment = db.fine_payment;
const seq = db.sequelize;

const returnBook = async (req, res) => {
  const { idLoan, returnDate } = req.body;
  const rDate = new Date(returnDate);
  try {
    const getLoan = await Loan.findOne({
      where: {
        id: idLoan,
      },
    });

    if (getLoan == null) {
      return res.status(403).send({
        status: 'fail',
        message: 'Data tidak ditemukan',
      });
    }

    const diffDate = (rDate - getLoan.dueDate) / (1000 * 3600 * 24);
    let amount = 0;
    if (diffDate > 0) {
      amount = diffDate * 5000;
    }

    await Loan.update(req.body, {
      where: {
        id: idLoan,
      },
    });

    const finePayment = await FinePayment.create({
      idLoan,
      receipt: 'receipt',
      amount,
    });
    return res.status(201).send({
      status: 'success',
      message: 'tambah pengembalian pinjam berhasil',
      data: {
        idLoan: finePayment.id,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

const getHistoryLoan = async (req, res) => {
  const token = req.headers['x-access-token'];

  console.log(token);
  const tokenParts = token.split('.');
  const encodedPayload = tokenParts[1];
  const rawPayload = Buffer.from(encodedPayload, 'base64').toString();
  const user = JSON.parse(rawPayload);
  const { id } = user;
  console.log(id);
  try {
    const historyLoan = await seq.query('select a.*, b.id as `finePayment.id`, b.receipt as `finePayment.receipt`, b.amount as `finePayment.amount` from loan a left join fine_payment b on a.id = b.id_loan where a.id_user = ?', {
      replacements: [id],
      type: QueryTypes.SELECT,
      nest: true,
    });
    return res.send({ status: 'success', message: 'query berhasil', data: historyLoan });
  } catch (err) {
    return res.status(500).send({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = {
  returnBook,
  getHistoryLoan,
};
