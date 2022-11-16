const { Schema, Types } = require("mongoose");

const TransactionsLog = new Schema({
    startDate: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date,
    },
    to: {
        type: Types.ObjectId,
        ref: "accounts",
        required: true,
    },
    from: {
        type: Types.ObjectId,
        ref: "accounts",
    },
    user: {
        type: Types.ObjectId,
        ref: "users",
        required: true,
    },
});

module.exports = TransactionsLog;
