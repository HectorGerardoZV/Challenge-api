const { check } = require("express-validator");
const { isValidObjectId } = require("mongoose");

const validateAddNewNormalProfile = [
    check("user", "User is required").notEmpty(),
    check("user").custom(user=>{
        if(!isValidObjectId(user)) throw new Error("Error, user is not valid");
        return true;
    }),
];
const validateGetNormalProfile = [];

module.exports = {
    validateAddNewNormalProfile,
    validateGetNormalProfile,
};
