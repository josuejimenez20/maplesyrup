import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { purchasePayment } from "../../redux/actions/buyProducts/PaymentProducts";

import '../../styles/buyProducts/buyShoppingCartProduct.css';

export function BuyShoppingCartProducts() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    let TOTAL_PRICE = 0;
    let PRODUCT_IDS = [];
    let PRODUCT_NAMES = [];
    let PRODUCT_QUANTITY = 0;

    const elementsShoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || null;

    elementsShoppingCart.forEach(element => {
        TOTAL_PRICE += element.price;
        PRODUCT_IDS.push(element.id_product);
        PRODUCT_NAMES.push(element.title);
        PRODUCT_QUANTITY += 1;
    });

    const USER_EMAIL = localStorage.getItem('email');
    const USER_ID = localStorage.getItem('id_user');
    const USER_NAME = localStorage.getItem('names');

    const createOrderHandler = (data, actions) => {
        // Set up the transaction
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: TOTAL_PRICE
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
                id_product_information: PRODUCT_IDS,
                name_product: PRODUCT_NAMES,
                count_products: PRODUCT_QUANTITY,
                value_payment: TOTAL_PRICE
            }));
            navigate(`/PaypalPaymentOneProduct/MessageSuccess`);
            // window.location.reload();
        });
    };

    return (<>

        {
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                <h1 style={{
                    marginBottom: '5%',
                    marginTop: '4%'
                }} className="google-font-pacific">Compras del carrito</h1>

                <Grid container direction="column" spacing={3}>
                    {elementsShoppingCart.map((product, index) => (
                        <Container item key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <img width={150} height={150} src={product.image_path} alt={product.title}
                                style={{
                                    marginRight: '2em'
                                }} />
                            <p className="pacific">{product.title} &nbsp;</p>
                            <p className="pacific">Precio: $ {product.price} &nbsp; MXN c/p</p>
                        </Container>
                    ))}
                </Grid>
                <Typography variant="h4"
                    style={{
                        marginTop: '2em',
                        marginBottom: '1em',
                        color: 'white'
                    }}>Precio Total: {TOTAL_PRICE}</Typography>
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
            </Container >

        }
    </>);
}
