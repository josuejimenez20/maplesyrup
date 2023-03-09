const {validationResult} = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        return res.status(403).json({
            msg: err.array()
        })
    }
}


module.exports = {validateResult}