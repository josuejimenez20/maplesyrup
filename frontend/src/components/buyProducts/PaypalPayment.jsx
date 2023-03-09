import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/buyProducts/paypalPayment.css';
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";
import { GetInformationProductById } from "../../redux/actions/buyProducts/GetInformationProductById";
import { PaymentProductsNotificationUser } from "../../redux/actions/buyProducts/PaymentProducts";

export function PaypalPayment() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id_product, count: countProducts } = useParams();

    const { loading, productInformation, error } = useSelector((state) => state.products.productInformation);

    const { id_product: id_product_information, name, count, price, description, path_image } = productInformation;

    const VALUE_PAYMENT = price * countProducts;

    const USER_EMAIL = localStorage.getItem('email');
    const USER_ID = localStorage.getItem('id_user');
    const USER_NAME = localStorage.getItem('names');


    // const initialOptions = {
    //     "AeL_Ni_kxn2i87lVrbiphqNIKxGfZxzfXaFUzfsFOGtln-TxLTMyYor7otQSFD6VelViSQaacfFJMupv": "test",
    //     currency: "MXN",
    //     intent: "capture"
    // };

    const createOrderHandler = (data, actions) => {
        // Set up the transaction
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: VALUE_PAYMENT
                    }
                }
            ]
        });
    };

    const onApproveHandler = (data, actions) => {

        const ORDER_ID = data.orderID;
        const PAYER_ID = data.payerID;


        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            // Mandar a una pestaña que diga que se hizo su pago

            dispatch(PaymentProductsNotificationUser({
                user_id: USER_ID,
                user_name: USER_NAME,
                user_email: USER_EMAIL,
                order_id: ORDER_ID,
                payer_id: PAYER_ID,
                id_product_information: id_product_information,
                name_product: name,
                count_products: countProducts,
                value_payment: VALUE_PAYMENT
            }));
            navigate(`/PaypalPaymentOneProduct/MessageSuccess`);
            // window.location.reload();
        });
    };

    useEffect(() => {
        dispatch(GetInformationProductById(id_product));
    }, [])

    return (<>

        <div id="containerPayments">

            <div id="productInformation">
                <h3 className="textInformation">Nombre del producto: <a className="subTextInformation">{name}</a></h3>
                <h3 className="textInformation">Precio: <a className="subTextInformation">{price}</a></h3>
                <h3 className="textInformation">Cantidad: <a className="subTextInformation">{countProducts}</a></h3>
                <img className="imgBuyProduct" src={path_image} alt="" />
                <h3 className="textInformation"><a className="subTextInformation">{description}</a></h3>
            </div>


            <PayPalScriptProvider
                options={{
                    "client-id": "AeL_Ni_kxn2i87lVrbiphqNIKxGfZxzfXaFUzfsFOGtln-TxLTMyYor7otQSFD6VelViSQaacfFJMupv",
                    currency: "MXN",
                    intent: "capture"
                }}>
                <PayPalButtons
                    createOrder={createOrderHandler}
                    onApprove={onApproveHandler}
                />
            </PayPalScriptProvider>

        </div>


    </>);
}
