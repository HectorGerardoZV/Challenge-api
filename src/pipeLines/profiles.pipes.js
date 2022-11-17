//Controllers
const { profilesController } = require("../controllers");
const { addNormalProfile, getNormalProfileByUser } = profilesController;

//Validators
const { profilesValidators } = require("../validators");
const { validateAddNewNormalProfile, validateGetNormalProfile } = profilesValidators;

const pipeLineAddNormalProfile = [validateAddNewNormalProfile, addNormalProfile];
const pipeLineGetNormalProfile = [validateGetNormalProfile, getNormalProfileByUser];

module.exports = {
    pipeLineAddNormalProfile,
    pipeLineGetNormalProfile,
};
