const { AccountsSchema } = require("../schemas");

const addNewAccount = async (req, res) => {
    try {
        const accountToCreate = new AccountsSchema(req.body);
        const accountCreated = await accountToCreate.save();
        res.status(200).json(accountCreated);
    } catch (error) {
        res.status(500).json({ msg: "Error while creating account" });
    }
};

const getAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await AccountsSchema.findOne({ _id: id }).populate("team");
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ msg: "Error while querying account" });
    }
};

const getAllAccounts = async (req, res) => {
    try {
        const accounts = await AccountsSchema.find({}).populate("team");
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ msg: "Error while querying accounts" });
    }
};

const getAccountsByName = async (req, res) => {
    try {
        const { name } = req.params;
        const accounts = await AccountsSchema.find({
            accountName: { $regex: `.*${name}.*`, $options: "i" },
        });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ msg: "Error while querying accounts" });
    }
};

const updateAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const { body: newAccountInfo } = req;

        const accountUpdated = await AccountsSchema.findOneAndUpdate({ _id: id }, newAccountInfo, {
            new: true,
        }).populate("team");
        res.status(200).json(accountUpdated);
    } catch (error) {
        res.status(500).json({ msg: "Error while updating account" });
    }
};

const deleteAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        await AccountsSchema.findOneAndDelete({ _id: id });
        res.status(200).json({ msg: "Account successfully deleted" });
    } catch (error) {
        res.status(500).json({ msg: "Error while deleting account" });
    }
};

module.exports = {
    addNewAccount,
    getAllAccounts,
    getAccountById,
    getAccountsByName,
    updateAccountById,
    deleteAccountById,
};
