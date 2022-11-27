const { check, validationResult, param } = require("express-validator");
const { isValidObjectId } = require("mongoose");
//Helpers
const { validatorsHelpers } = require("../helpers");
const { TeamsSchema } = require("../schemas");
const { validateRequest } = validatorsHelpers;

const validateAddUserToTeam = [
    check("user", "User is required").notEmpty(),
    check("user").custom((user) => {
        if (!isValidObjectId(user)) throw new Error("Invalid user id format");
        return true;
    }),
    check("team", "Team is required").notEmpty(),
    check("team").custom((team) => {
        if (!isValidObjectId(team)) throw new Error("Invalid team id format");
        return true;
    }),
    validateRequest,
];
const validateDeleteUserToTeam = [
    check("user", "User is required").notEmpty(),
    check("user").custom((user) => {
        if (!isValidObjectId(user)) throw new Error("Invalid user id format");
        return true;
    }),
    check("team", "Team is required").notEmpty(),
    check("team").custom((team) => {
        if (!isValidObjectId(team)) throw new Error("Invalid team id format");
        return true;
    }),
    validateRequest,
];
const validateGetTeamById = [
    check("id", "Team is required").notEmpty(),
    check("id").custom(async id => {
        const team = await TeamsSchema.findOne({ _id: id });
        if (!team) throw new Error("Error this team doesn't exist");
        return true;
    }),
    validateRequest,
];

module.exports = {
    validateAddUserToTeam,
    validateDeleteUserToTeam,
    validateGetTeamById
};
