const { Schema, Types } = require("mongoose");
const { hashSync, compare } = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");

const Users = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
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
    },
    { versionKey: false }
);
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

Users.plugin(mongoosePaginate);
module.exports = Users;
