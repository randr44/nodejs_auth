// mongodb
require('./config/db');

// express
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes');

// create server app
const app = express();

// cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes)

module.exports = app;