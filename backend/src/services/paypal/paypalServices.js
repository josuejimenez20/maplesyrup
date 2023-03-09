const nodemailer = require('nodemailer');

const { productInformationByIdModels, setCountProductById } = require('../../models/products/producstModels');


const paypalCreatePaymentServices = async (data) => {

    const { id_product_information, count_products } = data;

    try {

        const responseInformationProduct = await productInformationByIdModels(id_product_information);

        if (responseInformationProduct[0].count < count_products) {
            return { msg: "Count minor than number products odered", status: 400 }
        }

        const product_id = responseInformationProduct[0].id_product;
        const new_count = responseInformationProduct[0].count - count_products;

        const responseSetCountProduct = await setCountProductById({ product_id, new_count });

        const responseSenEmailPayer = sendEmailPayerInformationProduct(data);

        return responseSenEmailPayer;

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

    const transporter = nodemailer.createTransport({
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

module.exports = {
    paypalCreatePaymentServices
}

