const { Router } = require('express');
const { loginVerificate } = require('../../controllers/login/loginControllers');
const { validateLogin } = require('../../validator/login/verificateLogin');

const router = Router();

router.post('/verificate', validateLogin, loginVerificate);


module.exports = router;