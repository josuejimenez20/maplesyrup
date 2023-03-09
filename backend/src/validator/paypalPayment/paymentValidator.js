const { check } = require("express-validator");
const { validateResult } = require('../../helpers/validateHelper')

const paymentValidator = [
    check("user_id").exists().not().isEmpty(),
    check("user_name").exists().not().isEmpty(),
    check("user_email").exists().not().isEmpty(),
    check("order_id").exists().not().isEmpty(),
    check("payer_id").exists().not().isEmpty(),
    check("id_product_information").exists().not().isEmpty(),
    check("name_product").exists().not().isEmpty(),
    check("count_products").exists().not().isEmpty(),
    check("value_payment").exists().not().isEmpty(),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];

module.exports = { paymentValidator }
