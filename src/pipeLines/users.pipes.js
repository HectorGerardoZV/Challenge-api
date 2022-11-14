//Controllers
const { usersController } = require("../controllers");
const { addNewUser, getAllUsers, getUserById, getUsersByName, updateUserById, deleteUserById } =
    usersController;
//Validators
const { usersValidators } = require("../validators");
const {
    validateAddNewUser,
    validateGetAllUsers,
    validateGetUserById,
    validateGetUserByName,
    validateUpdateUserById,
    validateDeleteUserById,
} = usersValidators;

const pipeLineAddNewUser = [validateAddNewUser, addNewUser];

const pipeLineGetAllUsers = [validateGetAllUsers, getAllUsers];

const pipeLineGetUserById = [validateGetUserById, getUserById];

const pipeLineGetUsersByName = [validateGetUserByName, getUsersByName];

const pipeLineUpdateUserById = [validateUpdateUserById, updateUserById];

const pipeLineDeleteUserById = [validateDeleteUserById, deleteUserById];

module.exports = {
    pipeLineAddNewUser,
    pipeLineGetAllUsers,
    pipeLineGetUserById,
    pipeLineGetUsersByName,
    pipeLineUpdateUserById,
    pipeLineDeleteUserById,
};
