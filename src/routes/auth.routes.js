const authRouter = require("express").Router();
//PipeLines
const {pipeLinesAuth} = require("../pipeLines");
const {pipeLineLoginUser} = pipeLinesAuth;

authRouter.post("/auth",pipeLineLoginUser);


module.exports = authRouter;