const profilesRouter = require("express").Router();

//PipeLines
const { pipeLinesProfiles } = require("../pipeLines");
const { pipeLineAddNormalProfile, pipeLineGetNormalProfile } = pipeLinesProfiles;

profilesRouter.post("/profiles/normal", pipeLineAddNormalProfile);
profilesRouter.get("/profiles/normal/:user", pipeLineGetNormalProfile);

module.exports = profilesRouter;
