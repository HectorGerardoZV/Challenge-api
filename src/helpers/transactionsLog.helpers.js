const { TransactionsLogSchema, AccountsSchema } = require("../schemas");
const saveTransaction = async (info) => {
    let { to, from, user } = info;
    const startDate = new Date();
    let valuesTransaction = {
        startDate,
        user,
    };
    const toAccount = await AccountsSchema.findOne({ team: to });
    valuesTransaction.to = toAccount._id;

    if (from !== undefined) {
        const fromAccount = await AccountsSchema.findOne({ team: from });
        valuesTransaction.from = fromAccount._id;
        valuesTransaction.endDate = new Date();
    }
    try {
        const transactionToAdd = new TransactionsLogSchema(valuesTransaction);
        const transactionAdded = await transactionToAdd.save();
        return transactionAdded ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    saveTransaction,
};
