// mongodb
require('./config/db');

// express
const express = require('express');
const bodyParser = express.json();
const cors = require("cors");

// create server app
const app = express();

// cors
app.use(cors());
app.use(bodyParser);

module.exports = app;