import { Router } from "express";
import { loginVerify } from "../../controllers/login/loginControllers.js";
import { validateLogin } from "../../validator/login/verificateLogin.js";

const router = Router();

router.post('/verify', validateLogin, loginVerify);


export default router;