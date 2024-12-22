import Router from "express";
import {
    paypalPaymentControllers
} from "../../controllers/paypal/paypalControllers.js";

import { paymentValidator } from "../../validator/paypalPayment/paymentValidator.js";

const router = Router();

router.post('/payment', paymentValidator, paypalPaymentControllers);

export default router;