const express = require('express');
const path = require('path');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

cloudinary.config({
  cloud_name: 'cembeliq',
  api_key: '576668284399615',
  api_secret: 'g0U_mMHyAyJeboRs4FC1E7zfRWg',
});

const corsOption = {
  origin: ['http://cembeliq.com', 'http://172.17.0.2:8081'],
};

// process.env.TZ = 'Asia/Jakarta';
// console.log('Zona waktu diset ke: ', process.env.TZ);

app.use(cors(corsOption));
app.get('/', (req, res) => {
  res.send('Hello world!');
});

require('dotenv').config({ path: path.resolve('./.env') });

app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});
