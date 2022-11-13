const { model } = require("mongoose");
const Roles = require("./Roles.schema");
const Users = require("./Users.schema");
const Teams = require("./Teams.schema");
const Accounts = require("./Accounts.schema");

const Profiles = require("./Profiles/Profiles.schema");
const NormalProfiles = require("./Profiles/NormalProfiles.schema");

const UsersSchema = model("users", Users);
const RolesSchema = model("roles", Roles);
const TeamsSchema = model("teams", Teams);
const AccountsSchema = model("accounts", Accounts);
const ProfilesSchema = model("profiles", Profiles);
const NormalProfilesSchema = ProfilesSchema.discriminator("normalProfiles", NormalProfiles);

module.exports = {
    UsersSchema,
    RolesSchema,
    TeamsSchema,
    AccountsSchema,
    ProfilesSchema,
    NormalProfilesSchema,
};
