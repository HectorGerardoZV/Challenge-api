const authController = require("./auth.controllers");
const rolesController = require("./roles.controllers");
const usersController = require("./users.controller");
const accountsController = require("./accounts.controllers");
const teamsController = require("./teams.controllers");
const transactionsLogController = require("./transactionsLog.controller");

module.exports = {
    authController,
    usersController,
    rolesController,
    accountsController,
    teamsController,
    transactionsLogController,
};
