//Controllers
const { teamsController } = require("../controllers");
const { updateUsersTeam } = teamsController;

//Validators
const { teamsValidators } = require("../validators");
const { validateAddUserToTeam, validateDeleteUserToTeam } = teamsValidators;

//Helpers
const { teamHelpers } = require("../helpers");
const {
    validateExistEntities,
    updateUserInTeam,
    validateUserInTeamToAdd,
    validateUserInTeamToDelete,
} = teamHelpers;

const pipeLineAddUserToTeam = [
    validateAddUserToTeam,
    validateExistEntities,
    validateUserInTeamToAdd,
    updateUserInTeam,
    updateUsersTeam,
];
const pipeLineDeleteUserToTeam = [
    validateDeleteUserToTeam,
    validateExistEntities,
    validateUserInTeamToDelete,
    updateUserInTeam,
    updateUsersTeam,
];

module.exports = {
    pipeLineAddUserToTeam,
    pipeLineDeleteUserToTeam,
};
