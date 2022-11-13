const { RolesSchema } = require("../schemas");
const getAllRoles = async (__req, res, __next) => {
    try {
        const roles = await RolesSchema.find({});
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ msg: "Error while querying roles" });
    }
};

module.exports = {
    getAllRoles,
};
