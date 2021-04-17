const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

require(`${__dirname}/routes/auth.route`)(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost: ${port}`);
});
