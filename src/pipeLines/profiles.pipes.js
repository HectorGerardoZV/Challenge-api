//Controllers
const { profilesController } = require("../controllers");
const { addNormalProfile, getNormalProfileByUser, updateNormalProfileByUser } = profilesController;

//Validators
const { profilesValidators } = require("../validators");
const {
    validateAddNewNormalProfile,
    validateGetNormalProfile,
    validateUpdateNormalProfile
} = profilesValidators;

const pipeLineAddNormalProfile = [validateAddNewNormalProfile, addNormalProfile];
const pipeLineGetNormalProfile = [validateGetNormalProfile, getNormalProfileByUser];
const pipeLineUpdateNormalProfile = [validateUpdateNormalProfile, updateNormalProfileByUser];

module.exports = {
    pipeLineAddNormalProfile,
    pipeLineGetNormalProfile,
    pipeLineUpdateNormalProfile
};
