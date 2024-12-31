import Router from "express";
import {
    paypalPaymentControllers,
    getAllOrdersController
} from "../../controllers/paypal/paypalControllers.js";

import { paymentValidator } from "../../validator/paypalPayment/paymentValidator.js";

const router = Router();

router.get('/order', getAllOrdersController);
router.post('/payment', paymentValidator, paypalPaymentControllers);

export default router;