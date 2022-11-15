const accountsRouter = require("express").Router();
//PipeLines
const { pipeLinesAccounts } = require("../pipeLines");
const {
    pipeLineAddNewAccount,
    pipeLineDeleteAccountById,
    pipeLineGetAccountById,
    pipeLineGetAccountsByName,
    pipeLineGetAllAccounts,
    pipeLineUpdateAccountById,
} = pipeLinesAccounts;

accountsRouter.post("/accounts", pipeLineAddNewAccount);
accountsRouter.get("/accounts", pipeLineGetAllAccounts);
accountsRouter.get("/accounts/:id", pipeLineGetAccountById);
accountsRouter.get("/accounts/accountName/:name", pipeLineGetAccountsByName);
accountsRouter.put("/accounts/:id", pipeLineUpdateAccountById);
accountsRouter.delete("/accounts/:id", pipeLineDeleteAccountById);

module.exports = accountsRouter;
