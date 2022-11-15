const { check, validationResult, query, param } = require("express-validator");
const { AccountsSchema, TeamsSchema } = require("../schemas");
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

const validateAddNewAccount = [
    check("accountName", "Account name is required").notEmpty(),
    check("clientName", "Client name is required").notEmpty(),
    check("responsible", "Responsible is required").notEmpty(),
    check("accountName", "Account name is too short").isLength({ min: 2 }),
    check("accountName", "Account name is too long").isLength({ max: 50 }),
    check("clientName", "Client name is too short").isLength({ min: 3 }),
    check("clientName", "Client name is too long").isLength({ max: 50 }),
    check("responsible", "Responsible is too short").isLength({ min: 3 }),
    check("responsible", "Responsible is too long").isLength({ max: 50 }),
    validateRequest,
];
const validateGetAllAccounts = [(req, res, next) => {}, validateRequest];
const validateGetAccountById = [(req, res, next) => {}, validateRequest];
const validateGetAccountsByName = [(req, res, next) => {}, validateRequest];
const validateUpdateAccountById = [(req, res, next) => {}, validateRequest];
const validateDeleteAccountById = [(req, res, next) => {}, validateRequest];

module.exports = {
    validateAddNewAccount,
    validateGetAllAccounts,
    validateGetAccountById,
    validateGetAccountsByName,
    validateUpdateAccountById,
    validateDeleteAccountById,
};
