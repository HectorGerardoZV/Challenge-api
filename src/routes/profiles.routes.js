const profilesRouter = require("express").Router();

//PipeLines
const { pipeLinesProfiles } = require("../pipeLines");
const {
    pipeLineAddNormalProfile,
    pipeLineGetNormalProfile,
    pipeLineUpdateNormalProfile
} = pipeLinesProfiles;

profilesRouter.post("/profiles/normal", pipeLineAddNormalProfile);
profilesRouter.get("/profiles/normal/:user", pipeLineGetNormalProfile);
profilesRouter.put("/profiles/normal/:user", pipeLineUpdateNormalProfile);

module.exports = profilesRouter;
