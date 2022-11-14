const express = require("express");
const dbConnection = require("./config/dbConnection");
require("./schemas");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes");

const appConfiguration = async () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    await dbConnection();
    app.use(router);
    return app;
};

module.exports = appConfiguration;
