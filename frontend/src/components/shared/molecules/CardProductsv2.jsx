import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../../../styles/shared/molecules/customCard/customCardProductv2.css';
import whitNot_Image from '../../../../public/pictures/whitNot_Image.png';
import { fetchShoppingCart } from '../../../redux/slices/managmentProducts/shoppingCart';

export default function CardProductsv2({ id_product = "", title = "Titulo", price = "Precio", image = whitNot_Image }) {

    const dispatch = useDispatch();

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

    return (
        <>
            <div className="contenedor-card-item">
                <div className="contenedor-card-item-wrapper">
                    <img src={image} alt="" />
                    <div className="contenedor-info">
                        <div className="info">
                            <p className="titulo">{title}</p>
                            <p className="titulo">Precio: ${price}</p>
                            <span className="categoria">
                                <span className="categoria2">
                                    <button className='buttonBuy'>
                                        <Link className='text-decoration-none' to={`/BuyProducts/${id_product}`}>
                                            Comprar
                                        </Link>
                                    </button>
                                    <button className='buttonBuy' onClick={
                                        () => {
                                            handleAddProductShoppingCart(id_product, title, price, image);
                                            dispatch(fetchShoppingCart(true));
                                        }
                                    }>Carro</button>
                                </span>
                            </span>
                        </div>
                        <div className="fondo"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
