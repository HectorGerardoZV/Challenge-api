const { UsersSchema, RolesSchema } = require("../schemas");
const { SECRET, ROLE1, ROLE2, ROLE3 } = require("../config/globals");
const jwt = require("jsonwebtoken");
const loginUser = async (req, res, next) => {
    try {
        const { token } = req;
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Error while sending token" });
    }
};

const validateUserCredentials = async (req, res, next) => {
    let responseObject = {
        access: false,
    };
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(403).json(responseObject);
        const token = authorization.toString().split(" ")[1];
        const credentials = jwt.verify(token, SECRET);
        if (!credentials) return res.status(403).json(responseObject);
        const { id, role } = credentials;
        const userFound = await UsersSchema.findOne({ _id: id });
        if (!userFound) return res.status(403).json(responseObject);
        if (userFound.role.toString() !== role) return res.status(responseObject);
        const roleFound = await RolesSchema.findOne({ _id: role });
        if (!roleFound) return res.status(403).json(responseObject);
        if (roleFound._id.toString() !== role) return res.status(403).json(responseObject);
        const { name: roleName } = roleFound;
        if (roleName !== ROLE1 && roleName !== ROLE2 && roleName !== ROLE3)
            return res.status(403).json(responseObject);
        responseObject.role = roleFound.name;
        responseObject.access = true;
        res.status(200).json(responseObject);
    } catch (error) {
        res.status(403).json(responseObject);
    }
};

module.exports = {
    loginUser,
    validateUserCredentials,
};
