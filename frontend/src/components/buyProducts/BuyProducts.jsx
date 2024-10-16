import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button } from '@mui/material';
import { GetInformationProductById } from '../../redux/actions/buyProducts/GetInformationProductById'
import { fetchShoppingCart } from '../../redux/slices/managmentProducts/shoppingCart';
import loginMapleSyrup from '../../../public/pictures/loginMapleSyrup.gif';
import { MessageError } from "../shared/molecules/AlertMessages";
import '../../styles/buyProducts/buyProducts.css';

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
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'start',
                        marginTop: '5em',
                        marginBottom: '5em'
                    }}>
                    <img className="imageBuyProduct" src={path_image} alt="" />
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'black',
                    }}>
                        <h1 className="edu-au-vic-wa-nt-guides-font">{name}</h1>
                        <p className="edu-au-vic-wa-nt-guides-font p-edu-au-vic-wa-nt-guides-font">{description}</p>
                        <p className="edu-au-vic-wa-nt-guides-font p-edu-au-vic-wa-nt-guides-font">Precio: &nbsp; $ {price} &nbsp; MNX &nbsp; c/u</p>
                        <p className="edu-au-vic-wa-nt-guides-font p-edu-au-vic-wa-nt-guides-font">Cantidad: {numberProducts}</p>
                        <Container sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            gap: 2,
                            margin: "0em 0 1.5em 0"
                        }}>
                            <Button variant="outlined"
                                onClick={() => {
                                    setNumberProducts(numberProducts - 1)
                                }
                                }
                                disabled={numberProducts === 1 ? true : false}
                            >-</Button>
                            <Button variant="outlined"
                                onClick={() => {
                                    setNumberProducts(numberProducts + 1)
                                }
                                }
                                disabled={numberProducts === count ? true : false} >+</Button>

                        </Container>
                        <Container
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                gap: 2
                            }}>
                            <Button variant="outlined"
                                onClick={() => {
                                    handleValidateUserSession();
                                }}
                            >Comprar</Button>
                            <Button variant="outlined"
                                onClick={
                                    () => {
                                        handleAddProductShoppingCart(id_product, name, price, path_image)
                                        dispatch(fetchShoppingCart(true))
                                    }
                                }>Agregar al carrito</Button>
                        </Container>
                    </Container>
                </Container>
            }
            <p id="textOfCompany">Si no esta registrado, por favor regístrese para poder hacer compras en Maple Syrup, no le tomará más de 5 minutos.
                Seleccione el producto deseado para visualizar los detalles, puede buscar un producto en específico o puede buscar
                las categorías en el menú principal; agregue uno varios productos al carrito, introduzca los datos de su tarjeta para
                confirmar la compra y su producto llegará hasta su domicilio en breve. El costo de envío estará dado en función de la
                zona en que se solicite. le garantizamos la mejor experiencia de compras en línea.</p>
        </>
    );
}
