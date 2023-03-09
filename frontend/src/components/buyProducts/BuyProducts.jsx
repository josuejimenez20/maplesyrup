import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetInformationProductById } from '../../redux/actions/buyProducts/GetInformationProductById'
import { fetchShoppingCart } from '../../redux/slices/managmentProducts/shoppingCart';
import loginMapleSyrup from '../../../public/pictures/loginMapleSyrup.gif';
import '../../styles/buyProducts/buyProducts.css';
import { MessageError } from "../shared/molecules/AlertMessages";

export function BuyProducts() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id_product: id_product_params } = useParams();

    const [numberProducts, setNumberProducts] = useState(1);

    const { loading, productInformation, error } = useSelector((state) => state.products.productInformation);

    const { id_product, name, count, price, description, path_image } = productInformation;

    useEffect(() => {
        dispatch(GetInformationProductById(id_product_params));
    }, [])

    // Add Product to Shopping Cart
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

    const handleValidateUserSession = () => {
        const userSesionIdUser = localStorage.getItem("id_user") || "";
        const userSesionPassword = localStorage.getItem("password") || "";
        const userSesionEmail = localStorage.getItem("email") || "";

        if (!(userSesionIdUser || userSesionPassword || userSesionEmail)) {
            return navigate('/login/LoginUser')
        }
        return navigate(`/PaypalPaymentOneProduct/${id_product_params}/${numberProducts}`);
    }

    if (error) {
        return (
            <h2 className=' alert alert-danger row justify-content-center'>Error al obtener la informacion del producto</h2>
        )
    }

    return (
        <>
            {loading
                ? <div className="w-100 justify-content-center align-content-center row">
                    <img src={loginMapleSyrup} width={50} height={900} alt="" />
                </div>

                :
                <div id="containerInformationProduct">
                    <img className="imgBuyProduct" src={path_image} alt="" />
                    <div id="productInformation">
                        <h2 id="nameProduct">{name}</h2>
                        <h3 id="descriptionProduct">{description}</h3>
                        <h3 id="priceProduct">Precio: {price} c/u</h3>
                        <h3 className="aditionalInformationProduct">Cantidad: {numberProducts}</h3>
                        <div id="buttonActionsProduct">
                            <button className="buttonBuy btnActions"
                                onClick={() => {
                                    setNumberProducts(numberProducts - 1)
                                }
                                }
                                disabled={numberProducts === 1 ? true : false}
                            >-</button>
                            <button
                                className="buttonBuy btnActions"
                                onClick={() => {
                                    setNumberProducts(numberProducts + 1)
                                }
                                }
                                disabled={numberProducts === count ? true : false} >+</button>

                        </div>
                        <div id="buttonsBuyAndCart">
                            <button className="buttonBuy buyButton"
                                onClick={() => {
                                    handleValidateUserSession();
                                }}
                            >Comprar</button>
                            <button className="buttonBuy cartButton"
                                onClick={
                                    () => {
                                        handleAddProductShoppingCart(id_product, name, price, path_image)
                                        dispatch(fetchShoppingCart(true))
                                    }
                                }>Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            }
            <p id="textOfCompany">Si no esta registrado, por favor regístrese para poder hacer compras en Maple Syrup, no le tomará más de 5 minutos.
                Seleccione el producto deseado para visualizar los detalles, puede buscar un producto en específico o puede buscar
                las categorías en el menú principal; agregue uno varios productos al carrito, introduzca los datos de su tarjeta para
                confirmar la compra y su producto llegará hasta su domicilio en breve. El costo de envío estará dado en función de la
                zona en que se solicite. le garantizamos la mejor experiencia de compras en línea.</p>
        </>
    );
}
