const pipeLinesAuth = require("./auth.pipes");
const pipeLinesRoles = require("./roles.pipes");
const pipeLinesUsers = require("./users.pipes");
const pipeLinesAccounts = require("./accounts.pipes");
const pipeLinesTeams = require("./teams.pipes");

module.exports = {
    pipeLinesAuth,
    pipeLinesRoles,
    pipeLinesUsers,
    pipeLinesAccounts,
    pipeLinesTeams,
};
