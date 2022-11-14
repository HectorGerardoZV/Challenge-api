//Controllers
const { rolesController } = require("../controllers");
const { getAllRoles } = rolesController;

const pipeLineGetAllRoles = [getAllRoles];

module.exports = {
    pipeLineGetAllRoles,
};
