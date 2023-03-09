const { check } = require("express-validator");
const { validateResult } = require('../../helpers/validateHelper')

const validateCreate = [
    check("name").exists().not().isEmpty(),
    check("last_name").exists().not().isEmpty(),
    check("second_last_name").exists().not().isEmpty(),
    check("email").exists().not().isEmpty().isEmail(),
    check("password").exists().not().isEmpty(),
    check("telephone").exists().not().isEmpty().isNumeric(),
    check("gender").exists().not().isEmpty(),
    check("birth_date").exists().not().isEmpty(),
    check("state").exists().not().isEmpty(),
    check("city").exists().not().isEmpty(),
    check("postal_code").exists().not().isEmpty(),
    check("suburb").exists().not().isEmpty(),
    check("street").exists().not().isEmpty(),
    check("first_heighboring_street").exists().not().isEmpty(),
    check("second_heighboring_street").exists().not().isEmpty(),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];


module.exports = { validateCreate }
