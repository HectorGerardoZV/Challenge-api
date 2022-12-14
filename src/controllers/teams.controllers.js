const { TeamsSchema } = require("../schemas");

const updateUsersTeam = async (req, res) => {
    try {
        const { members } = req.team;
        const { team } = req.body;
        const { actionMessage } = req;
        const teamUpdated = await TeamsSchema.findOneAndUpdate(
            { _id: team },
            { members },
            {
                new: true,
            }
        );
        res.status(200).json({ team: teamUpdated, msg: actionMessage });
    } catch (error) {
        res.status(500).json({ msg: "Error while updating team" });
    }
};
const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;
        const team = await TeamsSchema.findOne({ _id: id }).populate("members");
        res.status(200).json(team);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error while querying team"});
    }

}
module.exports = {
    updateUsersTeam,
    getTeamById
};
