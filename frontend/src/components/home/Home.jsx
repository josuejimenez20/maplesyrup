import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box } from '@mui/material';
import { HomeRoute } from '../../router/home/HomeRouter';
import { CustomButtonNavigate } from '../shared/atoms/CustomButtonNavigate';
import { CustomInput } from '../shared/atoms/customInput';
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
            <Container sx={{
                backgroundColor: '#000000',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: "center",
                marginTop: "2em",
                marginBottom: "2em"
            }}>
                <Box sx={{
                    backgroundColor: '#000000',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '60%'
                }}>
                    <CustomButtonNavigate label='Mas Vendido' linkTo='SellTop' />
                    <CustomButtonNavigate label='Nuevos' linkTo='NewsProducts' />
                    <CustomButtonNavigate label='En Oferta' linkTo='OfferProducts' />
                </Box>
                <Box sx={{
                    backgroundColor: '#000000',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                    width: '40%',
                    paddingBottom: '2%'
                }}>
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
                </Box>
            </Container>
            <HomeRoute />
        </>
    )
}
