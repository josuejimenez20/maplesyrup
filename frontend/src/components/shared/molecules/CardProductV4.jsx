import { useState, useEffect } from 'react';
import {
    Card, CardContent, Typography,
    CardMedia, Button, Container
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoppingCart } from '../../../redux/slices/managmentProducts/shoppingCart/listShpppingCart';

export default function CardProductV4(
    { id_product = "",
        title = "Titulo",
        price = "Precio",
        image = whitNot_Image }) {

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


    return (
        <>
            <Card sx={{ minWidth: 300, backgroundColor: "#080808", border: 0, borderColor: "#474745" }}>
                <CardContent>
                    <Typography sx={{ color: 'white' }} variant='h5' textAlign="center"
                        marginBottom={2}>
                        {title}
                    </Typography>
                    <CardMedia
                        sx={{ height: 225, width: 'auto' }}
                        image={image}
                    />
                    <Typography sx={{ color: 'white' }} variant='h6'
                        textAlign="center" marginTop={2}>
                        ${price} MXN
                    </Typography>
                    <Container sx={{ marginTop: 2 }}>
                        <Button variant="outlined" sx={{ marginRight: 1 }}
                            onClick={() => {
                                navigate(`/BuyProducts/${id_product}`);
                            }}
                        >Comprar</Button>
                        <Button variant="outlined"
                            onClick={
                                () => {
                                    handleAddProductShoppingCart(id_product, title, price, image);
                                    dispatch(fetchShoppingCart(true));
                                }}
                        >Carrito</Button>
                    </Container>
                </CardContent>
            </Card >
        </>
    )
}
