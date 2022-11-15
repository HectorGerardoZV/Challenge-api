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
const validateGetAllAccounts = [
    query("page", "page query value is required").notEmpty(),
    query("page", "Page must be a number").isNumeric(),
    query("page").custom((value) => {
        if (Number(value) < 1) throw new Error("Invalid page");
        return true;
    }),
    validateRequest,
];
const validateGetAccountById = [
    param("id", "Id account is required").notEmpty(),
    param("id").custom((id) => {
        if (!isValidObjectId(id)) throw new Error("Invalid id format");
        return true;
    }),
    validateRequest,
];
const validateGetAccountsByName = [param("name", "Name is required").notEmpty(), validateRequest];
const validateUpdateAccountById = [
    check("accountName", "Account name is too short").optional().isLength({ min: 2 }),
    check("accountName", "Account name is too long").optional().isLength({ max: 50 }),
    check("clientName", "Client name is too short").optional().isLength({ min: 3 }),
    check("clientName", "Client name is too long").optional().isLength({ max: 50 }),
    check("responsible", "Responsible is too short").optional().isLength({ min: 3 }),
    check("responsible", "Responsible is too long").optional().isLength({ max: 50 }),
    validateRequest,
];
const validateDeleteAccountById = [
    param("id", "Id account is required").notEmpty(),
    param("id").custom((id) => {
        if (!isValidObjectId(id)) throw new Error("Invalid id");
        return true;
    }),
    validateRequest,
];

module.exports = {
    validateAddNewAccount,
    validateGetAllAccounts,
    validateGetAccountById,
    validateGetAccountsByName,
    validateUpdateAccountById,
    validateDeleteAccountById,
};
