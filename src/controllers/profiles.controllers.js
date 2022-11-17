const { NormalProfilesSchema } = require("../schemas");

const addNormalProfile = async (req, res) => {
    try {
        const profileInfo = new NormalProfilesSchema(req.body);
        const newProfile = await profileInfo.save();
        res.status(200).json(newProfile);
    } catch (error) {
        res.status(500).json({ msg: "Error while adding profile" });
    }
};

const getNormalProfileByUser = async (req, res) => {
    try {
        res.json({ msg: "SI" });
    } catch (error) {}
};

module.exports = {
    addNormalProfile,
    getNormalProfileByUser,
};
