const { Schema, Types } = require("mongoose");

const Teams = new Schema({
    members: {
        type: [Types.ObjectId],
        ref: "users",
    },
});

module.exports = Teams;
