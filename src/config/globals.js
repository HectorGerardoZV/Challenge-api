require("dotenv").config({ path: ".env" });

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DATABASE = process.env.DB_URL;
const COLLECTION = process.env.DB_COLLECTION;
const SECRET = process.env.SECRET;

module.exports = {
    HOST,
    PORT,
    DATABASE,
    COLLECTION,
    SECRET,
};
