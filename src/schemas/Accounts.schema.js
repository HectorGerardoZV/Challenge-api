const { Schema, Types } = require("mongoose");

const Accounts = new Schema({
    accountName: {
        type: String,
        unique: true,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    responsible: {
        type: String,
        required: true,
    },
    team: {
        type: Types.ObjectId,
        ref: "teams",
        required: true,
    },
});

module.exports = Accounts;
