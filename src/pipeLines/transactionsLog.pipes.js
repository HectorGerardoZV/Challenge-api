//Controllers
const { transactionsLogController } = require("../controllers");
const { getTransactionsLogByQuery } = transactionsLogController;

const pipeLineGetTransactionsLog = [ getTransactionsLogByQuery];

module.exports = {
    pipeLineGetTransactionsLog,
};
