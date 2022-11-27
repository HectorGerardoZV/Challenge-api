const teamsRouter = require("express").Router();
//PipeLines
const { pipeLinesTeams } = require("../pipeLines");
const {
    pipeLineAddUserToTeam,
    pipeLineDeleteUserToTeam,
    pipeLineGetTeamById
} = pipeLinesTeams;

teamsRouter.post("/teams", pipeLineAddUserToTeam);
teamsRouter.delete("/teams", pipeLineDeleteUserToTeam);
teamsRouter.get("/teams/:id", pipeLineGetTeamById);

module.exports = teamsRouter;
