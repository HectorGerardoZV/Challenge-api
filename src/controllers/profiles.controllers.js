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
        const { user } = req.params;
        const profile = await NormalProfilesSchema.findOne({ user }).populate("user");
        if (!profile) return res.status(404).json({ msg: "This user doesn't exist" });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ msg: "Error while querying profile" });
    }
};
const updateNormalProfileByUser = async (req, res) => {
    try {
        const { body } = req;
        const { user } = req.params;
        const profileUpdated = await NormalProfilesSchema.findOneAndUpdate({ user }, body, { new: true });
        if (!profileUpdated) return res.status(404).json({ msg: "This profile dosne't exist" });
        res.status(200).json(profileUpdated);
    } catch (error) {
        res.status(500).json({ msg: "Error while updating profile" });
    }
}

module.exports = {
    addNormalProfile,
    getNormalProfileByUser,
    updateNormalProfileByUser
};
