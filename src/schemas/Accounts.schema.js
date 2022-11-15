const { Schema, Types } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
Accounts.plugin(mongoosePaginate);

module.exports = Accounts;
