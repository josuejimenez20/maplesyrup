import {
    paypalCreatePaymentServices
} from "../../services/paypal/paypalServices.js";


const paypalPaymentControllers = async (req, res) => {

    try {

        let response = await paypalCreatePaymentServices(req.body);

        if (response.status && response.status === 400) {
            return res.status(400).json({
                msg: response.msg
            })
        }

        return res.status(200).json({
            response
        })
    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
}


export {
    paypalPaymentControllers
}