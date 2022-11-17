const { Schema, Types } = require("mongoose");

const Profiles = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "users",
    },
});

module.exports = Profiles;
