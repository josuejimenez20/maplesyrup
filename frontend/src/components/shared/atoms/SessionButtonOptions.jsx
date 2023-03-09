import React from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { fetchNewUserSuccess } from '../../../redux/slices/users';


export function SessionButtonOptions() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id_user = localStorage.getItem("id_user") || '';
    const email = localStorage.getItem("email") || '';
    const names = localStorage.getItem("names") || '';
    const password = localStorage.getItem("password") || '';
    const i_s_pa_ss = localStorage.getItem("i-s-pa-ss") || '';

    const handleDeletDataSession = () => {
        localStorage.removeItem("id_user");
        localStorage.removeItem("email");
        localStorage.removeItem("names");
        localStorage.removeItem("password");
        localStorage.removeItem("i-s-pa-ss");
        localStorage.removeItem("XMW-183DM");

        navigate('/login/LoginUser');
        window.location.reload();
    }

    return (<>

        <div className="dropdown me-5 nav-link btn-sesion">
            <button className="btn dropdown-toggle bg-body" type="button" id="dropdownmenu" data-bs-toggle="dropdown" aria-expanded="false">
                Sesion
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownmenu">

                {i_s_pa_ss ?
                    <div className="dropdown-item" href="#">
                        <Link className="nav-link" to={`/User/${id_user}`}>
                            {names}
                        </Link>
                    </div>
                    :
                    <>
                        <div className="dropdown-item" href="#">
                            <Link className="nav-link" to={'/login/LoginUser'}>
                                Inicio de Sesion
                            </Link>
                        </div>
                        <div className="dropdown-item" href="#">
                            <Link className="nav-link" to={'/login/Register'}>
                                Registrarse
                            </Link>
                        </div>
                    </>
                }
                {i_s_pa_ss ?
                    <button className="btn btn-primary w-100 mt-3"
                        onClick={() => {
                            dispatch(handleDeletDataSession());
                            dispatch(fetchNewUserSuccess({}))
                        }}
                    >Cerrar sesion</button>
                    : ''}
            </div>
        </div>

    </>)
}
