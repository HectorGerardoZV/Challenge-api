const { Schema, Types } = require("mongoose");

const Profiles = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "users",
    },
});

module.exports = Profiles;
