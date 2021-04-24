const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cloudinary = require('cloudinary').v2;
const { handleError } = require('./utils/error');

const app = express();
const port = 3000;

require('dotenv').config({ path: path.resolve('./.env') });
require('./utils/redis');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const corsOption = {
  origin: ['http://cembeliq.com', 'http://172.17.0.2:8081'],
};

app.use(cors(corsOption));
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use('/api/v1', require('./routes'));

app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});
