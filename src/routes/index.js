const router = require("express").Router();

//Routers
const authRouter = require("./auth.routes");
const rolesRouter = require("./roles.routes");
const usersRouter = require("./users.routes");

router.use(authRouter);
router.use(rolesRouter);
router.use(usersRouter);

module.exports = router;
