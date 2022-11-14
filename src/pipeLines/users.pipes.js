//Controllers
const { usersController } = require("../controllers");
const { addNewUser, getAllUsers, getUserById, getUsersByName, updateUserById, deleteUserById } =
    usersController;
//Validators
const { usersValidators } = require("../validators");
const { validateAddNewUser } = usersValidators;

const pipeLineAddNewUser = [validateAddNewUser, addNewUser];

const pipeLineGetAllUsers = [getAllUsers];

const pipeLineGetUserById = [getUserById];

const pipeLineGetUsersByName = [getUsersByName];

const pipeLineUpdateUserById = [updateUserById];

const pipeLineDeleteUserById = [deleteUserById];

module.exports = {
    pipeLineAddNewUser,
    pipeLineGetAllUsers,
    pipeLineGetUserById,
    pipeLineGetUsersByName,
    pipeLineUpdateUserById,
    pipeLineDeleteUserById,
};
