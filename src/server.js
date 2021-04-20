const express = require('express');
const path = require('path');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3000;

require('dotenv').config({ path: path.resolve('./.env') });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});
