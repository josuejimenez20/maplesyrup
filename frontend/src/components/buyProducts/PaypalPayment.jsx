import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography } from "@mui/material";
import '../../styles/buyProducts/paypalPayment.css';
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";
import { GetInformationProductById } from "../../redux/actions/buyProducts/GetInformationProductById";
import { purchasePayment } from "../../redux/actions/buyProducts/PaymentProducts";

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

            dispatch(purchasePayment({
                user_id: USER_ID,
                user_name: USER_NAME,
                user_email: USER_EMAIL,
                order_id: ORDER_ID,
                payer_id: PAYER_ID,
                id_product_information: [id_product_information],
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

        <Container sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '3em'
                }}>
                <h1 className="edu-au-vic-wa-nt-guides-font">{name}</h1>
                <p className="edu-au-vic-wa-nt-guides-font p-edu-au-vic-wa-nt-guides-font">Precio: &nbsp; $ {price} &nbsp; MNX &nbsp; c/u</p>
                <p className="edu-au-vic-wa-nt-guides-font p-edu-au-vic-wa-nt-guides-font">Cantidad: {countProducts}</p>
                <img className="imgBuyProduct" src={path_image} alt="" />
                <p className="edu-au-vic-wa-nt-guides-font p-product-description-du-au-vic-wa">{description}</p>
            </Container>

            <PayPalScriptProvider
                options={{
                    "client-id": "AdwcEgPNUMJmHtKqA7LuB6cd6cnRwAjqzji2UswSlRYk2SFti0YK75_2bSxWlES_I021KTfRizVNVu9C",
                    currency: "MXN",
                    intent: "capture"
                }}>
                <PayPalButtons
                    createOrder={createOrderHandler}
                    onApprove={onApproveHandler}
                />
            </PayPalScriptProvider>
        </Container>
    </>);
}
