import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CardProductv3 } from '../shared/molecules/CardProductv3';
import { GetListSalesProducts } from '../../redux/actions/salesProducts/GetListSalesProducts';

export function SalesProducts() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetListSalesProducts());
    }, [])

    const { loading, products, error } = useSelector((state) => state.products.list);

    if (error) {
        return (
            <h2 className=' alert alert-danger row justify-content-center'>Error al obtener los productos</h2>
        )
    }

    return (<>

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

    </>);
}
