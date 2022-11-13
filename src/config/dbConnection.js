const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const dbConnection = async () => {
    const URL = `${process.env.DB_URL}/${process.env.DB_COLLECTION}`;
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
