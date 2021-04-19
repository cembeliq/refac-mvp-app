const fs = require('fs');
const path = require('path');

const db = require('../models');

const User = db.user;

const uploadFile = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file === undefined) {
      return res.send('File belum dipilih');
    }
    console.log('id : ', req.params.id);
    console.log('photo: ', req.file.filename);
    const user = User.update({ photo: req.file.filename }, {
      where: {
        id: req.params.id,
      },
    });
    console.log(user);
    if (user > 0) {
      fs.writeFileSync(path.join(__dirname, '/assets/uploads/', req.file.originalname));
    }
    return res.send({ status: 'success', message: 'File telah berhasil diupload' });
  } catch (err) {
    return res.status(500).send({ status: 'fail', message: err.message });
  }
};

module.exports = { uploadFile };
