const { check, validationResult } = require("express-validator");
const { UsersSchema, RolesSchema } = require("../schemas");
const { isValidObjectId } = require("mongoose");
const validateRequest = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        const errors = error.array().map((errorAux) => {
            return { param: errorAux.param, msg: errorAux.msg };
        });
        res.status(400).json({ errors });
    }
};
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

module.exports = {
    validateAddNewUser,
};
