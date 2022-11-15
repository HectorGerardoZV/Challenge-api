//Controllers
const { accountsController } = require("../controllers");
const {
    addNewAccount,
    deleteAccountById,
    getAccountById,
    getAccountsByName,
    getAllAccounts,
    updateAccountById,
} = accountsController;
//Validators
const { accountsValidators } = require("../validators");
const {
    validateAddNewAccount,
    validateDeleteAccountById,
    validateGetAccountById,
    validateGetAccountsByName,
    validateGetAllAccounts,
    validateUpdateAccountById,
} = accountsValidators;
//Helpers
const { accountsHelpers } = require("../helpers");
const { createTeamAccount } = accountsHelpers;

const pipeLineAddNewAccount = [validateAddNewAccount, createTeamAccount, addNewAccount];
const pipeLineGetAllAccounts = [validateGetAllAccounts, getAllAccounts];
const pipeLineGetAccountById = [validateGetAccountById, getAccountById];
const pipeLineGetAccountsByName = [validateGetAccountsByName, getAccountsByName];
const pipeLineUpdateAccountById = [validateUpdateAccountById, updateAccountById];
const pipeLineDeleteAccountById = [validateDeleteAccountById, deleteAccountById];

module.exports = {
    pipeLineAddNewAccount,
    pipeLineGetAllAccounts,
    pipeLineGetAccountById,
    pipeLineGetAccountsByName,
    pipeLineUpdateAccountById,
    pipeLineDeleteAccountById,
};
