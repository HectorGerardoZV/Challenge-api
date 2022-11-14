const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const globals = require("./globals");
const DATABASE = globals.DATABASE;
const COLLECTION = globals.COLLECTION;

const dbConnection = async () => {
    const URL = `${DATABASE}/${COLLECTION}`;
    const dbConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        await mongoose.connect(URL, dbConfig);
        console.log("Database connected");
    } catch (error) {
        console.log("Error while connecting with the database");
        process.exit(0);
    }
};
module.exports = dbConnection;
