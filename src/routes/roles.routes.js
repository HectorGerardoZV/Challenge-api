const rolesRouter = require("express").Router();
//PipeLines
const { pipeLinesRoles } = require("../pipeLines");
const { pipeLineGetAllRoles } = pipeLinesRoles;

rolesRouter.get("/roles", pipeLineGetAllRoles);

module.exports = rolesRouter;
