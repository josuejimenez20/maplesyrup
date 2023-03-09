import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeRoute } from '../../router/home/HomeRouter';
import { CustomButtonNavigate } from '../shared/atoms/CustomButtonNavigate';
import { CustomInput } from '../shared/atoms/customInput';
import { CustomButtonNavigatev2 } from '../shared/atoms/CustomButtonNavigatev2';
import { FcSearch } from 'react-icons/fc';

import { GetProductsByWord } from '../../redux/actions/home/GetProductsByWord';

export function Home() {

    const { loading } = useSelector((state) => state.products.list);

    const dispatch = useDispatch();

    const handleFindProductsByWord = (word) => {
        dispatch(GetProductsByWord(word));
    }

    return (
        <>
            <div className='containerTopNavBar'>
                <CustomButtonNavigate label='Mas Vendido' linkTo='SellTop' />
                <CustomButtonNavigate label='Nuevos' linkTo='NewsProducts' />
                <CustomButtonNavigate label='En Oferta' linkTo='OfferProducts' />
                <div id='containerForm'>
                    <form className="d-flex" onSubmit={(e) => {
                        e.preventDefault()
                        handleFindProductsByWord(e.target.name.value);
                    }}>
                        <CustomInput />
                        <button className="btn btnFormSearch"
                            type="submit"
                            disabled={loading ? true : false}
                        ><FcSearch /></button>
                    </form>
                </div>
            </div>
            <HomeRoute />
        </>
    )
}
