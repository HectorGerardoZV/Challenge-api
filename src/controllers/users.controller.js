const { UsersSchema } = require("../schemas");
const addNewUser = async (req, res) => {
    try {
        const userToAdd = new UsersSchema(req.body);
        const newUser = await userToAdd.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error while adding new user" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        let users = await UsersSchema.find({}).populate("role");
        users = [...users].map(userItem => {
            const newUser = { ...userItem._doc }
            newUser.role = userItem.role.name
            return newUser;
        })
        res.status(200).json(users.reverse());
    } catch (error) {
        res.status(500).json({ msg: "Error while querying users" });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UsersSchema.findOne({ _id: id }).populate("role");
        if (!user) return res.status(404).json({ msg: "This user doens't exist" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Error while querying the user" });
    }
};

const getUsersByName = async (req, res) => {
    try {
        const { name } = req.params;
        const users = await UsersSchema.find({
            name: { $regex: `.*${name}.*`, $options: "i" },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Error while querying users" });
    }
};

const updateUserById = async (req, res) => {
    try {
        const newUserInfo = req.body;
        const { id } = req.params;
        const userUpdated = await UsersSchema.findOneAndUpdate({ _id: id }, newUserInfo, {
            new: true,
        }).populate("role");
        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(500).json({ msg: "Error while updating users" });
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await UsersSchema.findOneAndDelete({ _id: id });
        if (!userDeleted) return res.status(404).json({ msg: "This user doesn't exist" });
        res.status(200).json({ msg: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Error while deleting user" });
    }
};

module.exports = {
    addNewUser,
    getAllUsers,
    getUserById,
    getUsersByName,
    updateUserById,
    deleteUserById,
};
