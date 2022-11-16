const router = require("express").Router();
//Heloers
const { accessHelpers } = require("../helpers");
const { validateURLAccess } = accessHelpers;

//Routers
const authRouter = require("./auth.routes");
const rolesRouter = require("./roles.routes");
const usersRouter = require("./users.routes");
const accountsRouter = require("./accounts.routes");
const teamsRouter = require("./teams.routes");

router.use(validateURLAccess);
router.use(authRouter);
router.use(rolesRouter);
router.use(usersRouter);
router.use(accountsRouter);
router.use(teamsRouter);

module.exports = router;
