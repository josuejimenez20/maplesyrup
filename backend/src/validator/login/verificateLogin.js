import { check } from "express-validator";
import { validateResult } from "../../helpers/validateHelper.js";

const validateLogin = [
    check("email").exists().not().isEmpty().isEmail(),
    check("password").exists().not().isEmpty(),

    (req, res, next) => {
        validateResult(req, res, next)
    }
];

export { validateLogin }
