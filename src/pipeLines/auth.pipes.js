//Controllers
const { authController } = require("../controllers");
const { loginUser, validateUserCredentials } = authController;
//Validators
const { authValidators } = require("../validators");
const { validateLoginInputs } = authValidators;

const pipeLineLoginUser = [validateLoginInputs, loginUser];
const pipeLineCheckTokenUser = [validateUserCredentials];

module.exports = {
    pipeLineLoginUser,
    pipeLineCheckTokenUser,
};
