const db = require('../models');

const Loan = db.loan;
const FinePayment = db.fine_payment;

const returnBook = async (req, res) => {
  const { idLoan, returnDate } = req.body;
  const rDate = new Date(returnDate);
  try {
    const getLoan = await Loan.findOne({
      where: {
        id: idLoan,
      },
    });
    // console.log(countBorrowed);
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

module.exports = {
  returnBook,
};
