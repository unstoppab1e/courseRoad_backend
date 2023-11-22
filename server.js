require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
const cookieParser = require('cookie-parser');
require('./database');
const User = require('./models/user-model');
const Token = require('./models/token-model');
require('./models/associations');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.use(express.static('public'));

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
