const { Router } = require('express');
const {
    paypalPaymentControllers
} = require('../../controllers/paypal/paypalControllers');

const { paymentValidator } = require('../../validator/paypalPayment/paymentValidator');

const router = Router();

router.post('/payment', paymentValidator, paypalPaymentControllers);

module.exports = router;