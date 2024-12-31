import {
    paypalCreatePaymentServices,
    getAllOrdersService
} from "../../services/paypal/paypalServices.js";


const paypalPaymentControllers = async (req, res) => {

    try {

        let response = await paypalCreatePaymentServices(req.body);

        return res.status(200).json({
            response
        })
    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
}

const getAllOrdersController = async (req, res) => {
    try {
        const response = await getAllOrdersService();        

        return res.status(200).json({
            response
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error from server"
        })
    }
}

export {
    paypalPaymentControllers,
    getAllOrdersController
}