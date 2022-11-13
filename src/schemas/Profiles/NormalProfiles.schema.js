const { Schema } = require("mongoose");

const NormalProfiles = new Schema({
    englishLevel: {
        type: String,
        required: true,
    },
    technicalKnowledge: {
        type: String,
        required: true,
    },
    linkCV: {
        type: String,
        required: true,
    },
});

module.exports = NormalProfiles;
