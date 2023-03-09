import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CardProductsv2 from '../shared/molecules/CardProductsv2';
import { CardProductv3 } from '../shared/molecules/CardProductv3';
import { GetListSellTopsProducts } from '../../redux/actions/sellTops/GetListSellTopsProducts';

export function SellTopProducts() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetListSellTopsProducts());
    }, [])

    const { loading, products, error } = useSelector((state) => state.products.list);

    if (error) {
        return (
            <h2 className=' alert alert-danger row justify-content-center'>Error al obtener los productos</h2>
        )
    }

    return <>
        <div id='containerProducts'>

            {products.map((product, index) => {
                return <div key={index} className='col-lg-3 col-sm-1 productCard'>
                    <CardProductv3
                        title={product.name}
                        price={product.price}
                        image={product.path_image}
                    /></div>
            })}

            {loading ? <h1>Cargando</h1> : ''}
        </div>

    </>;
}





