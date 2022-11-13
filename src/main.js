const express = require("express");
const dbConnection = require("./config/dbConnection");
require("./schemas");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const appConfiguration = async () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    await dbConnection();
    return app;
};

module.exports =appConfiguration ;
