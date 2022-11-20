const authRouter = require("express").Router();
//PipeLines
const { pipeLinesAuth } = require("../pipeLines");
const { pipeLineLoginUser, pipeLineCheckTokenUser } = pipeLinesAuth;

authRouter.post("/auth", pipeLineLoginUser);
authRouter.get("/auth", pipeLineCheckTokenUser);

module.exports = authRouter;
