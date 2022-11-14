const { check, param, validationResult } = require("express-validator");
//Schemas
const { UsersSchema } = require("../schemas");
//Helpers
const { bcryptHelpers, jwtHelpers } = require("../helpers");
const _ = require("mongoose-paginate-v2");
const { compareInfo } = bcryptHelpers;
const { generateJWT } = jwtHelpers;

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

const validateLoginInputs = [
    check("email", "Email is required").notEmpty(),
    check("email", "Invalid email format").isEmail(),
    check("password", "Password is required").notEmpty(),
    check("email").custom(async (email, { req }) => {
        const user = await UsersSchema.findOne({ email });
        if (!user) throw new Error("Invalid credentials");
        req.user = user;
        return true;
    }),
    check("password").custom(async (password, { req }) => {
        const { user } = req;
        if (!user) throw new Error("Invalid credentials");
        const isValidUser = await compareInfo(password, user.password);
        if (!isValidUser) throw new Error("Invalid credentials");
        return true;
    }),
    (req, __res, next) => {
        try {
            const { user } = req;
            const token = generateJWT(user);
            req.token = token;
            next();
        } catch (error) {
            throw new Error("Error while generating JWT");
        }
    },
    validateRequest,
];

module.exports = {
    validateLoginInputs,
};
