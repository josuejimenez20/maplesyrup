import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Container} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { GetListProducts } from '../../redux/actions/products/GetListProducts';

// import { CardProductv3 } from '../shared/molecules/CardProductv3';

import CardProductV4 from '../shared/molecules/CardProductV4';
import loginMapleSyrup from '../../../public/pictures/loginMapleSyrup.gif';

import '../../styles/homeStyles/customProductsHome.css'
import '../../styles/shared/molecules/customCard/customCardProductv3.css';

export function HomeProducts() {

    const dispatch = useDispatch()

    const { loading, products, error } = useSelector((state) => state.products.list);

    useEffect(() => {
        dispatch(GetListProducts());
    }, [])

    if (error) {
        return (
            <h2 className=' alert alert-danger row justify-content-center'>Error al obtener los productos</h2>
        )
    }

    return (
        <>
            {
                loading
                    ? <div className="w-100 justify-content-center align-content-center row">
                        <img src={loginMapleSyrup} width={50} height={900} alt="" />
                    </div>
                    :
                    <Grid container spacing={12} alignContent='center' justifyContent='center'>

                        {products.map((product, index) => {
                            return <Grid key={index}>
                                <CardProductV4
                                    id_product={product.id_product}
                                    title={product.name}
                                    price={product.price}
                                    image={product.path_image}
                                /></Grid>
                        })}

                    </Grid>

            }
        </>
    )
}

