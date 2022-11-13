const { Schema, Types } = require("mongoose");
const { hashSync, compare } = require("bcrypt");

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
Users.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        const passwordEncrypted = await hashSync(this.password, 10);
        this.password = passwordEncrypted;
        next();
    } catch (error) {
        next();
    }
});
Users.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
};

module.exports = Users;
