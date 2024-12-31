import { createTransport } from "nodemailer";

import { productInformationByIdModels, setCountProductById } from "../../models/products/producstModels.js";
import {
    getUserIdWithUserIdEncryptedModel,
    setNewOrderModel,
    setNewProductToOrderModel,
    getAllOrdersModel
} from "../../models/paypal/paypalModels.js";


const paypalCreatePaymentServices = async (data) => {
    const { id_product_information } = data;
    try {

        for (const element of id_product_information) {
            // const responseSetCountProduct = await setCountProductById(element, 1);
        }

        const user_id = await getUserIdWithUserIdEncryptedModel(data);

        const newOrderResponse = await setNewOrderModel(user_id[0].id_user, data);

        for (const element of id_product_information) {
            const responseSetCountProduct = await setNewProductToOrderModel(element, data);
        }

        // Get user id * 
        // Fill orders information *
        // Fill order_to_product information *


        return { msg: "Order Created", code: 200 };
    } catch (error) {
        return error;
    }
}

const getAllOrdersService = async () => {
    try {
        const data = await getAllOrdersModel();        

        return { msg: "Orders", code: 200, data }
    } catch (error) {
        return error;
    }
}

const sendEmailPayerInformationProduct = ({ data }) => {

    const message = {
        from: "maplesyrupcompanymx@gmail.com",
        to: 'josuexgato22@gmail.com',
        subject: "Ejemplo de asunto de correo",
        text: "Plaintext version of the message",
        html: "<p>Link para entrar a la página de microlab: <br> <a href='https://microlab.ec'></a></p>"
    };

    const transporter = createTransport({
        service: 'gmail',
        port: 3001,
        auth: {
            user: 'maplesyrupcompanymx@gmail.com', // Data of Company
            pass: 'Maples1ruMe1c0mx' // Data of Company
        }
    })

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log("Error enviando email")
            console.log(error.message)
        } else {
            console.log("Email enviado")
        }
    })
}

export {
    paypalCreatePaymentServices,
    getAllOrdersService
}

