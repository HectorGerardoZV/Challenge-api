const transactionsLogRouter = require("express").Router();
//PipeLines
const { pipeLinesTransactionsLog } = require("../pipeLines");
const { pipeLineGetTransactionsLog } = pipeLinesTransactionsLog;

transactionsLogRouter.get("/transactionsLog", pipeLineGetTransactionsLog);

module.exports = transactionsLogRouter;
