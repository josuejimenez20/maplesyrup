import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';

export function ShoppingCart() {

    const navigate = useNavigate();

    const [loadingCart, setLoadingCart] = useState(false);

    // Delete element of shopping cart
    const handleDeleteElement = (indexElement) => {
        const elementsShoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
        const newLements = elementsShoppingCart.filter((element, index) => {
            return indexElement != index;
        })

        // Update of data from shopping_cart
        localStorage.setItem("shopping_cart", JSON.stringify(newLements));

        setLoadingCart(true);
    }

    useEffect(() => {
        setTimeout(() => {
            setLoadingCart(false);
        }, 2000);
    }, [loadingCart])

    const elementsShoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];

    return (<>
        {loadingCart ?
            "cargando"
            :
            <div className="dropdown me-5">
                <button className="btn dropdown-toggle" type="button" id="dropdownmenu" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaShoppingCart size={20} color="black" />
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownmenu">

                    {elementsShoppingCart.map((product, index) => {
                        return <div className="dropdown-item" href="#">
                            <img width={50} height={50} src={product.image_path} alt="" className="" />
                            <a className="me-2">{product.title}</a>
                            <button className="btn btn-danger" onClick={() => {
                                handleDeleteElement(index)
                            }} ><FaTrashAlt /></button>
                        </div>
                    })}
                    <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={() => {
                            navigate('/PaypalPaymentShoppingCart');
                        }}
                    >Ir al carrito</button>
                </div>
            </div>
        }

    </>);
}
