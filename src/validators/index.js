const authValidators = require("./auth.validators");
const rolesValidators = require("./role.validators");
const usersValidators = require("./users.validators");
const accountsValidators = require("./accounts.validators");
const teamsValidators = require("./teams.validators");
const profilesValidators = require("./profiles.validators");

module.exports = {
    authValidators,
    rolesValidators,
    usersValidators,
    accountsValidators,
    teamsValidators,
    profilesValidators,
};
