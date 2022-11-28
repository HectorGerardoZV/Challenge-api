const { TransactionsLogSchema } = require("../schemas");

const getTransactionsLogByQuery = async (__req, res) => {
    try {
        const transactions = await TransactionsLogSchema.find({})
        .populate("user")
        .populate("from")
        .populate("to");
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ msg: "Error while querying transactions" });
    }
};

module.exports = {
    getTransactionsLogByQuery,
};
