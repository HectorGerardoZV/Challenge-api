const usersRouter = require("express").Router();
//PipeLines
const { pipeLinesUsers } = require("../pipeLines");
const {
    pipeLineAddNewUser,
    pipeLineGetAllUsers,
    pipeLineGetUserById,
    pipeLineGetUsersByName,
    pipeLineUpdateUserById,
    pipeLineDeleteUserById,
} = pipeLinesUsers;


usersRouter.post("/users",pipeLineAddNewUser);
usersRouter.get("/users",pipeLineGetAllUsers);
usersRouter.get("/users/:id",pipeLineGetUserById);
usersRouter.get("/users/name/:name",pipeLineGetUsersByName);
usersRouter.put("/users/:id",pipeLineUpdateUserById);
usersRouter.delete("/users/:id",pipeLineDeleteUserById);


module.exports = usersRouter;
