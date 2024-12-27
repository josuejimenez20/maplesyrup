import React from 'react';
import { useSelector } from "react-redux"
import { Stack } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import CardEditProduct from './CardEditProduct';


export default function ListProducts() {

    const navigate = useNavigate();

    const { loading, products, error } = useSelector((state) => state.products.listEdit);

    const handleEdit = (product_id) => {
        navigate(`/UltimateUser/edit-product/${product_id}`)
    };

    const handleDelete = (product_id) => {
        console.log(`Eliminar producto con ID: ${product_id}`);
    };

    return (
        <>
            {
                products && !error ?
                    <Stack spacing={2} sx={{ mt: 4, justifyContent: 'center', alignItems: 'center' }}>
                        {products.map((product, index) => {
                            return <CardEditProduct
                                key={index}
                                product_id={product.id_product}
                                product={product}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        })}
                    </Stack>
                    : <></>
            }
        </>
    );
}
