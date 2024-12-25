import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    Container, Box,
    Typography, Button
} from '@mui/material';
import { ShoppingCart } from "./ShoppingCart";
import { fetchShoppingCart } from '../../../redux/slices/managmentProducts/shoppingCart/listShpppingCart';
import { SessionButtonOptions } from "../atoms/SessionButtonOptions";
import loginMapleSyrup from '../../../../public/pictures/loginMapleSyrup.gif';
import '../../../styles/shared/atoms/NavBar/navBar.css';

export function NavBar() {

    const dispatch = useDispatch();


    const { loading } = useSelector((state) => state.shopping_cart.list);
    const { loading: loadingNewUser, success, error, userData
    } = useSelector((state) => state.users.new);
    const [rootPermision, setRootPermission] = useState(false);

    useEffect(() => {
        const id_user = localStorage.getItem("id_user") || '';
        const rootPermission = localStorage.getItem("XMW-183DM") || '';
        const i_s_pa_ss = localStorage.getItem("i-s-pa-ss") || '';

        if (rootPermission) {
            setRootPermission(true);
        }
    }, [success, userData])


    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                dispatch(fetchShoppingCart(false));
            }, 2000);
        }
    }, [loading])

    return (<>
        <Container style={{
            backgroundColor: '#020202',
            padding: '0.6%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-around',
        }}>

            <Box sx={{ backgroundColor: "#020202", width: '50%', display: 'flex', justifyContent: 'space-around' }}>
                <Button variant="text">
                    <Link to="home" style={{ fontSize: '20px', color: 'grey', textDecoration: 'none', fontWeight: 'bold' }}>
                        Home
                    </Link>
                </Button>
                <Button>
                    <Link to="About" style={{ fontSize: '20px', color: 'grey', textDecoration: 'none', fontWeight: 'bold' }}>
                        About
                    </Link>
                </Button>
                {
                    rootPermision ?
                        <Button>
                            <Link to="UltimateUser" style={{ fontSize: '20px', color: 'grey', textDecoration: 'none', fontWeight: 'bold' }}>
                                ADMIN
                            </Link>
                        </Button> : ""
                }
            </Box>

            <Box sx={{ backgroundColor: "#020202", width: '50%', display: 'flex', justifyContent: 'space-evenly' }}>
                {loading ?
                    <img width={100} height={50} src={loginMapleSyrup} alt="" />
                    :
                    <ShoppingCart />
                }
                {loadingNewUser ? '' :
                    <SessionButtonOptions />
                }
            </Box>
        </Container>
    </>);
}