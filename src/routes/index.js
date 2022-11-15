const router = require("express").Router();
//Heloers
const { accessHelpers } = require("../helpers");
const { validateURLAccess } = accessHelpers;

//Routers
const authRouter = require("./auth.routes");
const rolesRouter = require("./roles.routes");
const usersRouter = require("./users.routes");
const accountsRouter = require("./accounts.routes");

router.use(validateURLAccess);
router.use(authRouter);
router.use(rolesRouter);
router.use(usersRouter);
router.use(accountsRouter);

module.exports = router;
