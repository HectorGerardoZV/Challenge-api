const { TeamsSchema } = require("../schemas");

const createTeamAccount = async (req, res, next) => {
    try {
        const teamToAdd = new TeamsSchema({ members: [] });
        const teamAdded = await teamToAdd.save();
        req.body.team = teamAdded._id;
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error while creating team" });
    }
};

module.exports = {
    createTeamAccount,
};
