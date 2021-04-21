/* eslint-disable consistent-return */

// const fs = require('fs');
// const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const db = require('../models');

const User = db.user;

const uploadFile = async (req, res, next) => {
  const streamUpload = () => new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
  try {
    const result = await streamUpload(req);
    console.log(result);
    User.update({ photo: result.url }, {
      where: {
        id: req.params.id,
      },
    });
    return res.send({ status: 'success', message: 'File telah berhasil diupload' });
  } catch (err) {
    next(err);
  }
};
// const uploadFile = async (req, res) => {
//   try {
//     console.log(req.file);
//     if (req.file === undefined) {
//       return res.send('File belum dipilih');
//     }
//     console.log('id : ', req.params.id);
//     console.log('photo: ', req.file.filename);
//     const user = User.update({ photo: req.file.filename }, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     console.log(user);
//     if (user > 0) {
//       fs.writeFileSync(path.join(__dirname, '/assets/uploads/', req.file.originalname));
//     }
//     return res.send({ status: 'success', message: 'File telah berhasil diupload' });
//   } catch (err) {
//     return res.status(500).send({ status: 'fail', message: err.message });
//   }
// };

module.exports = { uploadFile };
