const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        const errors = error.array().map((errorAux) => {
            return { param: errorAux.param, msg: errorAux.msg };
        });
        res.status(400).json({ errors });
    }
};

module.exports = { validateRequest };
