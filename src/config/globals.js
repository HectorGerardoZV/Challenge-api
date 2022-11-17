require("dotenv").config({ path: ".env" });

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DATABASE = process.env.DB_URL;
const COLLECTION = process.env.DB_COLLECTION;
const SECRET = process.env.SECRET;
const ROLE1 = process.env.ROLE1;
const ROLE2 = process.env.ROLE2;
const ROLE3 = process.env.ROLE3;

module.exports = {
    HOST,
    PORT,
    DATABASE,
    COLLECTION,
    SECRET,
    ROLE1,
    ROLE2,
    ROLE3,
};
