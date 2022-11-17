const { check, validationResult, query, param } = require("express-validator");
const { UsersSchema, RolesSchema } = require("../schemas");
const { isValidObjectId } = require("mongoose");
const { bcryptHelpers } = require("../helpers");
//Helpers
const { validatorsHelpers } = require("../helpers");
const { validateRequest } = validatorsHelpers;

const validateAddNewUser = [
    check("role", "Role is required").notEmpty(),
    check("role").custom(async (role) => {
        if (!isValidObjectId(role)) throw new Error("Invalid role id format");
        const roleFound = await RolesSchema.findOne({ _id: role });
        if (!roleFound) throw new Error("This role doesn't exist");
        return true;
    }),
    check("name", "Name is required").notEmpty(),
    check("name", "Name is too short").isLength({ min: 3 }),
    check("name", "Name is too long").isLength({ max: 50 }),
    check("password", "Password is required").notEmpty(),
    check("password", "Password is too short").isLength({ min: 6 }),
    check("email", "Email is required").notEmpty(),
    check("email", "Invalid email format").isEmail(),
    check("email").custom(async (email) => {
        const userFound = await UsersSchema.findOne({ email });
        if (userFound) throw new Error("This emails is already in use");
        return true;
    }),
    validateRequest,
];

const validateGetAllUsers = [
    query("page", "page query value is required").notEmpty(),
    query("page", "Page must be a number").isNumeric(),
    query("page").custom((value) => {
        if (Number(value) < 1) throw new Error("Invalid page");
        return true;
    }),
    validateRequest,
];
const validateGetUserById = [
    param("id", "Id user is required").notEmpty(),
    param("id").custom((id) => {
        if (!isValidObjectId(id)) throw new Error("Invalid id");
        return true;
    }),
    validateRequest,
];
const validateGetUserByName = [param("name", "Name is required").notEmpty(), validateRequest];
const validateUpdateUserById = [
    param("id", "User id is required").notEmpty(),
    param("id").custom(async (id) => {
        if (!isValidObjectId(id)) throw new Error("Invalid user id format");
        const userFound = await UsersSchema.findOne({ _id: id });
        if (!userFound) throw new Error("This user doesn't exist");
        return true;
    }),
    check("role")
        .optional()
        .custom(async (role) => {
            if (!isValidObjectId(role)) throw new Error("Invalid role id format");
            const roleFound = await RolesSchema.findOne({ _id: role });
            if (!roleFound) throw new Error("This role doesn't exist");
            return true;
        }),
    check("name", "Name is too short").optional().isLength({ min: 3 }),
    check("name", "Name is too long").optional().isLength({ max: 50 }),
    check("email", "Invalid email format").optional().isEmail(),
    check("password", "Password is to short").optional().isLength({ min: 6 }),
    param("id").custom(async (id, { req }) => {
        const { email } = req.body;
        const userFound = await UsersSchema.findOne({ _id: id });
        if (userFound.email === email) delete req.body.email;
        if (req.body.password)
            req.body.password = await bcryptHelpers.encryptInfo(req.body.password);
        return true;
    }),
    validateRequest,
];
const validateDeleteUserById = [
    param("id", "Id user is required").notEmpty(),
    param("id").custom((id) => {
        if (!isValidObjectId(id)) throw new Error("Invalid id");
        return true;
    }),
    validateRequest,
];

module.exports = {
    validateAddNewUser,
    validateGetAllUsers,
    validateGetUserById,
    validateGetUserByName,
    validateUpdateUserById,
    validateDeleteUserById,
};
