const jwt = require("jsonwebtoken");

const { SECRET } = require("../config/globals");

const generateJWT = (info) => {
    try {
        const token = jwt.sign(
            {
                id: info._id,
                email: info.email,
                role: info.role,
            },
            SECRET,
            { expiresIn: "1d" }
        );

        return token;
    } catch (error) {}
};

const validateJWT = (token) => {
    try {
        const credentials = jwt.verify(token, SECRET);
        if (!credentials) return { access: false };
        return { access: true };
    } catch (error) {}
};

module.exports = {
    generateJWT,
    validateJWT,
};
