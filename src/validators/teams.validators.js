const { check, validationResult } = require("express-validator");
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
const validateAddUserToTeam = [
    check("user", "User is required").notEmpty(),
    check("user").custom((user) => {
        if (!isValidObjectId(user)) throw new Error("Invalid user id format");
        return true;
    }),
    check("team", "Team is required").notEmpty(),
    check("team").custom((team) => {
        if (!isValidObjectId(team)) throw new Error("Invalid team id format");
        return true;
    }),
    validateRequest,
];
const validateDeleteUserToTeam = [
    check("user", "User is required").notEmpty(),
    check("user").custom((user) => {
        if (!isValidObjectId(user)) throw new Error("Invalid user id format");
        return true;
    }),
    check("team", "Team is required").notEmpty(),
    check("team").custom((team) => {
        if (!isValidObjectId(team)) throw new Error("Invalid team id format");
        return true;
    }),
    validateRequest,
];

module.exports = {
    validateAddUserToTeam,
    validateDeleteUserToTeam,
};
