const { Schema } = require("mongoose");

const Roles = new Schema({
    name: {
        type: String,
    },
});

module.exports = Roles;
