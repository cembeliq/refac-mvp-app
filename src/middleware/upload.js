const multer = require('multer');
const path = require('path');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../assets/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-cembeliq-${file.originalname}`);
  },
});

const uploadFile = multer({ storage, fileFilter: imageFilter });

module.exports = uploadFile;
