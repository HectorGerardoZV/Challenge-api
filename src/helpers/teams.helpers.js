const { UsersSchema, TeamsSchema } = require("../schemas");
const { saveTransaction } = require("./transactionsLog.helpers");

const validateExistEntities = async (req, res, next) => {
    try {
        const { user, team } = req.body;
        const userFound = await UsersSchema.findOne({ _id: user });
        const teamFound = await TeamsSchema.findOne({ _id: team });
        if (!userFound || !teamFound)
            return res.status(404).json({ msg: "Access denied, invalid user" });
        req.team = teamFound;
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error while searching for the user" });
    }
};

const validateUserInTeamToAdd = async (req, res, next) => {
    try {
        const { user, team } = req.body;
        const teamFound = await TeamsSchema.findOne({ members: [user.toString()] });
        if (teamFound) {
            if (teamFound._id.toString() !== team.toString()) {
                teamFound.members = teamFound.members.filter(
                    (userItem) => userItem.toString() !== user.toString()
                );
                const { members } = teamFound;
                await TeamsSchema.findOneAndUpdate(
                    { _id: teamFound._id },
                    { members },
                    { new: true }
                );
                const transaction = await saveTransaction({ from: teamFound._id, to: team, user });
                if (!transaction)
                    return res.status(500).json({ msg: "Error while adding transactionLog" });
            } else {
                return res
                    .status(403)
                    .json({ msg: "This user is already registered in this account." });
            }
        } else {
            const transaction = await saveTransaction({ to: team, user });
            if (!transaction)
                return res.status(500).json({ msg: "Error while adding transactionLog" });
        }
        req.team.members.push(user);
        req.newUserStatus = true;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error while updating team" });
    }
};

const validateUserInTeamToDelete = (req, res, next) => {
    try {
        const { team } = req;
        const { user } = req.body;
        const userFound = team.members.find((userItem) => userItem, toString() === user.toString());
        if (!userFound)
            return res.status(403).json({ msg: "This user doesn't exist in this account" });

        req.newUserStatus = false;
        team.members = team.members.filter((userItem) => userItem.toString() !== user.toString());
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error while validating user in account" });
    }
};

const updateUserInTeam = async (req, res, next) => {
    try {
        const { newUserStatus } = req;
        const { user } = req.body;
        const userUpdated = await UsersSchema.findOneAndUpdate(
            { _id: user },
            { inTeam: newUserStatus },
            { new: true }
        );

        if (!userUpdated)
            return res
                .status(500)
                .json({ msg: "Error, Error the user could not be added to the team" });
        req.actionMessage = newUserStatus ? "User added successfully" : "User deleted successfully";
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error while updating user" });
    }
};

const addTransaction = async (req, res) => {
    try {
    } catch (error) {}
};

module.exports = {
    validateExistEntities,
    validateUserInTeamToAdd,
    validateUserInTeamToDelete,
    updateUserInTeam,
};
