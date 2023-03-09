import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingCart } from '../../../redux/slices/managmentProducts/shoppingCart/listShpppingCart';

export function CardProductv3({ id_product = "", title = "Titulo", price = "Precio", image = whitNot_Image }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.shopping_cart.list);

    const [dataShopping, setDataShopping] = useState([]);

    useEffect(() => {
        setDataShopping(JSON.parse(localStorage.getItem("shopping_cart")) || []);
    }, [])

    const handleAddProductShoppingCart = (id_product, title, price, image_path) => {

        const objectData = {
            id_product,
            title,
            price,
            image_path,
            count: 1
        }

        // Get data from localstorage
        // It's most an array 
        const array = dataShopping;

        // Add the product join data localstorage
        array.push(objectData);

        // Add data to localstorage
        localStorage.setItem("shopping_cart", JSON.stringify(array));
    }

    return (<>
        <div className="container">
            <div className="card">
                <div className="imageBox">
                    <img src={image} />
                </div>
                <div className="contentBox">
                    <h2>{title}</h2>
                    <div className="price">
                        <h3>Precio :</h3>
                        <span>$ {price}</span>
                    </div>
                    <div className="toCart">
                        <button className="buttonCard" onClick={
                            () => {
                                handleAddProductShoppingCart(id_product, title, price, image);
                                dispatch(fetchShoppingCart(true));
                            }
                        }>Al carrito</button>
                    </div>
                    <div className="buy" >
                        <button className="buttonCard" onClick={() => {
                            navigate(`/BuyProducts/${id_product}`);
                        }}>Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
