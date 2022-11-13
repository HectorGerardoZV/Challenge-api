const { Schema, Types } = require("mongoose");

const Users = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Types.ObjectId,
        ref: "roles",
        required: true,
    },
});

module.exports = Users;
