import React from "react";
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import '../../styles/buyProducts/buyShoppingCartProduct.css';

export function BuyShoppingCartProducts() {

    let TOTAL_PRICE = 0;

    const elementsShoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || null;

    elementsShoppingCart.forEach(element => {
        TOTAL_PRICE += element.price;
    });

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
                        "client-id": "AeL_Ni_kxn2i87lVrbiphqNIKxGfZxzfXaFUzfsFOGtln-TxLTMyYor7otQSFD6VelViSQaacfFJMupv",
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
