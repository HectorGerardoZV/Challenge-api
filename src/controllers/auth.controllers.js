const loginUser = async (req, res, next) => {
    try {
        const { token } = req;
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Error while sending token" });
    }
};

const validateUserCredentials = async (req, res, next) => {
    try {
    } catch (error) {}
};

module.exports = {
    loginUser,
    validateUserCredentials,
};
