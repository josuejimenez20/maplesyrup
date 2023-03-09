import React, { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons
} from "@paypal/react-paypal-js";
import '../../styles/buyProducts/buyShoppingCartProduct.css';

export function BuyShoppingCartProducts() {

    let TOTAL_PRICE = 0;

    const elementsShoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];

    console.log(elementsShoppingCart[0].price);

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

        <div id="containerShoppingCart">
            <h2 id="titlePage">Compras del carrito</h2>
            <div>
                {elementsShoppingCart.map((product, index) => {
                    return <div key={index} className="product" href="#">
                        <img width={150} height={150} src={product.image_path} alt="" className="" />
                        <a className="me-2 informationProduct">{product.title}</a>
                        <a className="me-2 informationProduct">Precio: {product.price}</a>
                    </div>
                })}
            </div>
            <h5>Precio Total: {TOTAL_PRICE}</h5>
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
