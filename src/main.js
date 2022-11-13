const express = require("express");
const dbConnection = require("./config/dbConnection");
require("./schemas");

const app = express();
dbConnection();

module.exports = app;