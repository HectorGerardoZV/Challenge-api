const router = require("express").Router();

//Routers
const rolesRouter = require("./roles.routes");
const usersRouter = require("./users.routes");

router.use(rolesRouter);
router.use(usersRouter);

module.exports = router;
