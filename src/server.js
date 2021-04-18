const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOption = {
  origin: ['http://cembeliq.com', 'http://172.17.0.2:8081'],
};

app.use(cors(corsOption));
app.get('/', (req, res) => {
  res.send('Hello world!');
});

require('dotenv').config({ path: path.resolve('./.env') });

// require(`${__dirname}/routes/auth.route`)(app);
app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});
