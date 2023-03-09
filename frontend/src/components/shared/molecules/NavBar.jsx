import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart } from "./ShoppingCart";
import { fetchShoppingCart } from '../../../redux/slices/managmentProducts/shoppingCart/listShpppingCart';
import { SessionButtonOptions } from "../atoms/SessionButtonOptions";
import loginMapleSyrup from '../../../../public/pictures/loginMapleSyrup.gif';
import littleLogo from '../../../../public/pictures/littleLogo.png';
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
        <nav className="navbar navbar-expand-lg" id="navBarMenu" style={{ background: '', margin: '2px 10px 2em 10px', padding: '0.6%' }} >
            <div className="container-fluid row">
                <a className="navbar-brand col-lg-4" href="#">
                    <img id="logo_image" src={littleLogo}></img>
                </a>
                <button className="navbar-toggler mb-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse col-lg-6 row" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item col-lg-2">
                            <Link className="nav-link" to="home"><strong style={{ fontSize: '20px', margin: '20px', color: 'white' }}>Home</strong></Link>
                        </li>
                        <li className="nav-item col-lg-2">
                            <Link className="nav-link" to="About"><strong style={{ fontSize: '20px', margin: '20px', color: 'white' }}>About</strong></Link>
                        </li>
                        {
                            rootPermision ?
                                <li className="nav-item col-lg-2">
                                    <Link className="nav-link" to="UltimateUser"><strong style={{ fontSize: '20px', margin: '20px', color: 'white' }}>Katia</strong></Link>
                                </li> : ""
                        }
                    </ul>
                </div>
                <div className="col-lg-4 shopping-and-sesion">
                    {loading ?
                        <img width={100} height={10} src={loginMapleSyrup} alt="" />
                        :
                        <ShoppingCart />
                    }
                    {loadingNewUser ? '' :
                        <SessionButtonOptions />
                    }
                </div>
            </div>
        </nav>
    </>);
}