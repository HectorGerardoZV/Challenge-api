//Controllers
const { authController } = require("../controllers");
const { loginUser } = authController;
//Validators
const { authValidators } = require("../validators");
const { validateLoginInputs } = authValidators;

const pipeLineLoginUser = [validateLoginInputs, loginUser];

module.exports = {
    pipeLineLoginUser,
};
