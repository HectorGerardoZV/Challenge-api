const jwt = require("jsonwebtoken");
const { SECRET, ROLE1, ROLE2, ROLE3 } = require("../config/globals");
const { RolesSchema, UsersSchema } = require("../schemas");

const whiteList = [
    {
        POST: "/auth",
        GET: "/auth",
    },
];

const whiteListNormal = [
    {
        GET: "/profiles/normal",
    },
];

const validateURLAccess = (req, res, next) => {
    const urlRequest = `/${req.url.split("/")[1]}`;
    const validURL = whiteList.find((urlItem) => urlItem[req.method] === urlRequest);
    if (!validURL) return validateTokenMiddleware(req, res, next);
    next();
};

const validateTokenMiddleware = (req, res, next) => {
    try {
        let token = "";
        const { authorization } = req.headers;
        if (authorization) {
            token = authorization.toString().split(" ")[1];
            const user = jwt.verify(token, SECRET);
            if (!user) return res.status(401).json({ access: false });
            const { role, id } = user;
            req.user = { role, id };
            return validateTokenRole(req, res, next);
        } else {
            res.status(401).json({ access: false });
        }
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            access: false,
        });
    }
};

const validateTokenRole = async (req, res, next) => {
    try {
        const { user } = req;
        const existUser = await UsersSchema.findOne({ _id: user.id });
        const existRole = await RolesSchema.findOne({ _id: user.role });
        if (!existUser || !existRole) return res.status(401).json({ access: false });
        if (existRole.name !== ROLE1 && existRole.name !== ROLE2 && existRole.name !== ROLE3)
            return res.status(401).json({ access: false });

        if (existRole.name === ROLE3) {
            const valid = validdateNormalUserAccess(req.url, req.method);
            if (!valid) return res.status(403).json({ access: false });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            access: false,
        });
    }
};

const validdateNormalUserAccess = (url, method) => {
    const urlArray = url.split("/");
    const urlFormated = `/${urlArray[1]}/${urlArray[2]}`;
    const exist = whiteListNormal.find((urlItem) => urlItem[method].includes(urlFormated));
    return exist ? true : false;
};

module.exports = {
    validateURLAccess,
};
