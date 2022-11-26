const { check, validationResult, query, param } = require("express-validator");
const { AccountsSchema, TeamsSchema } = require("../schemas");
const { isValidObjectId } = require("mongoose");
//Helpers
const { validatorsHelpers } = require("../helpers");
const { validateRequest } = validatorsHelpers;

const validateAddNewAccount = [
    check("accountName", "Account name is required").notEmpty(),
    check("accountName").custom(async accountName=>{
        const accountFound = await AccountsSchema.findOne({accountName});
        if(accountFound) throw new Error("Error, this account name is already taken");
        return true;
    }),
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
