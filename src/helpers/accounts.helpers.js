const { TeamsSchema, AccountsSchema } = require("../schemas");

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

const deleteTeamAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const accountFound = await AccountsSchema.findOne({ _id: id });
        if (!accountFound) return res.status(404).json({ msg: "This account doesn't exist" });
        const { team } = accountFound;

        const teamDeleted = await TeamsSchema.findOneAndDelete({ _id: team });
        if (!teamDeleted) return res.status(404).json({ msg: "This team doesn't exist" });
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error while deleting team" });
    }
};

module.exports = {
    createTeamAccount,
    deleteTeamAccount
};
