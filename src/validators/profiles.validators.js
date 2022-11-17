const { check, param } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const { SECRET, ROLE3, ROLE1, ROLE2 } = require("../config/globals");

//Schemas
const { NormalProfilesSchema, RolesSchema } = require("../schemas");
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
const validateGetNormalProfile = [
    param("user", "User is required").notEmpty(),
    param("user").custom(async (user, { req }) => {
        const { authorization } = req.headers;
        const token = authorization.toString().split(" ")[1];
        const userToken = jwt.verify(token, SECRET);
        const roleFound = await RolesSchema.findOne({ _id: userToken.role });
        if (roleFound.name === ROLE1 || roleFound.name === ROLE2) return true;
        else if (roleFound.name === ROLE3) {
            if (userToken.id !== user)
                throw new Error("You do not have permission to access this profile");
        }
    }),
    validateRequest,
];

module.exports = {
    validateAddNewNormalProfile,
    validateGetNormalProfile,
};
