const teamsRouter = require("express").Router();
//PipeLines
const { pipeLinesTeams } = require("../pipeLines");
const { pipeLineAddUserToTeam, pipeLineDeleteUserToTeam } = pipeLinesTeams;

teamsRouter.post("/teams", pipeLineAddUserToTeam);
teamsRouter.delete("/teams", pipeLineDeleteUserToTeam);

module.exports = teamsRouter;
