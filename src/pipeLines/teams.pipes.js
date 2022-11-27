//Controllers
const { teamsController } = require("../controllers");
const { updateUsersTeam, getTeamById } = teamsController;

//Validators
const { teamsValidators } = require("../validators");
const { validateAddUserToTeam, validateDeleteUserToTeam, validateGetTeamById } = teamsValidators;

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
const pipeLineGetTeamById = [
    validateGetTeamById,
    getTeamById,
]

module.exports = {
    pipeLineAddUserToTeam,
    pipeLineDeleteUserToTeam,
    pipeLineGetTeamById
};
