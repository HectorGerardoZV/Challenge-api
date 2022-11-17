const { check } = require("express-validator");
const { isValidObjectId } = require("mongoose");
//Schemas
const { NormalProfilesSchema } = require("../schemas");
//Helpers
const { validatorsHelpers } = require("../helpers");
const { validateRequest } = validatorsHelpers;

const validateAddNewNormalProfile = [
    check("user", "User is required").notEmpty(),
    check("user").custom((user) => {
        if (!isValidObjectId(user)) throw new Error("Error, user is not valid");
        return true;
    }),
    check("user").custom(async (user) => {
        const getProfile = await NormalProfilesSchema.findOne({ user: user });
        if (getProfile) throw new Error("This user already has a profile");
    }),
    check("englishLevel", "English level is required").notEmpty(),
    check("englishLevel", "English level is too short").isLength({ min: 1 }),
    check("englishLevel", "English level is too long").isLength({ max: 15 }),
    check("technicalKnowledge", "Technical knowledge is required").notEmpty(),
    check("technicalKnowledge", "Technical knowledge is too short").isLength({ min: 5 }),
    check("linkCV", "CV Link is required").notEmpty(),
    validateRequest,
];
const validateGetNormalProfile = [];

module.exports = {
    validateAddNewNormalProfile,
    validateGetNormalProfile,
};
