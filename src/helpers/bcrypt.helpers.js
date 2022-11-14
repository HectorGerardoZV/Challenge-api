const bcrypt = require("bcrypt");

const encryptInfo = async (info) => {
    try {
        const infoEncrypted = await bcrypt.hashSync(info, 10);
        return infoEncrypted;
    } catch (error) {
        throw new Error(error.message);
    }
};
const compareInfo = async (valueA, valueB) => {
    try {
        return await bcrypt.compare(valueA, valueB);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    encryptInfo,
    compareInfo,
};
