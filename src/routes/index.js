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
const transactionsLogRouter = require("./transactionsLog.routes");
const profilesRouter = require("./profiles.routes");

//Use
router.use(validateURLAccess);
router.use(authRouter);
router.use(rolesRouter);
router.use(usersRouter);
router.use(accountsRouter);
router.use(teamsRouter);
router.use(transactionsLogRouter);
router.use(profilesRouter);

module.exports = router;
