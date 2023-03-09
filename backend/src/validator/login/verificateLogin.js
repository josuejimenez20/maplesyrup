const { check } = require("express-validator");
const { validateResult } = require('../../helpers/validateHelper')

const validateLogin = [
    check("email").exists().not().isEmpty().isEmail(),
    check("password").exists().not().isEmpty(),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { validateLogin }
