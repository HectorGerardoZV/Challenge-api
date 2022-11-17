const { TransactionsLogSchema, AccountsSchema, UsersSchema } = require("../schemas");
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

const getUserTransaction = async (user) => {
    try {
        const userFound = await UsersSchema.findOne({
            name: { $regex: `.*${user}.*`, $options: "i" },
        });
        let response = { value: "", action: true };
        response.value = !userFound ? "" : userFound._id;
        return response;
    } catch (error) {
        return { value: null, action: false };
    }
};

const getAccountsTransaction = async (account) => {
    try {
        let accountName = account.replace("_", " ");
        const accountFound = await AccountsSchema.findOne({
            accountName: { $regex: `.*${accountName}.*`, $options: "i" },
        });
        let response = { value: "", action: true };
        response.value = !accountFound ? "" : accountFound._id;
        return response;
    } catch (error) {
        return { value: null, action: false };
    }
};

module.exports = {
    saveTransaction,
    getUserTransaction,
    getAccountsTransaction,
};
