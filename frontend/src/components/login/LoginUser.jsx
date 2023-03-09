import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/login/loginUser";
import '../../styles/login/loginUser.css';
import { MessageError } from "../shared/molecules/AlertMessages";

export function LoginUser() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { success, error } = useSelector((state) => state.users.new);

    const handleInitSesionUser = (data) => {
        const formData = {
            email: data.target.email.value,
            password: data.target.password.value,
        }
        dispatch(loginUser(formData));
    }

    return (<>

        <div id="main">
            <form id="login_form" className="form_class" method="submit"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleInitSesionUser(e)
                }} >
                <div className="form_div">
                    <label>Usuario:</label>
                    <input className="field_class" name="email" type="text" placeholder="Ingrese su Usuario" />
                    <label>Contraseña:</label>
                    <input id="pass" className="field_class" name="password" type="password" placeholder="Ingrese su contraseña" />
                    <button className="submit_class" type="submit">Entrar</button>
                </div>
                <div className="info_div">
                    <p>¿No estás registrado?  <Link to={'/login/Register'}> Registrese!</Link></p>
                </div>
            </form>
        </div>
        <footer>
            <p>Creado por <a href="#">MapleSyrup</a></p>
        </footer>
    </>);
}