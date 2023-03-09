import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RegisterNewUser } from '../../redux/actions/login/registerUsers';
import { MessageSuccess, MessageError } from "../shared/molecules/AlertMessages";
import '../../styles/login/registerUser.css';

export function RegisterUser() {

    const dispatch = useDispatch();

    const { loading, success, error, userData
    } = useSelector((state) => state.users.new);

    const handleRegisterUser = (data) => {

        const formData = {
            name: data.target.nombre.value,
            last_name: data.target.apellido.value,
            second_last_name: data.target.apellido1.value,
            birth_date: data.target.birth_date.value,
            gender: data.target.user_gender.value,
            telephone: data.target.telephone.value,
            state: data.target.user_state.value,
            city: data.target.ciudad.value,
            suburb: data.target.suburb.value,
            postal_code: data.target.postal_code.value,
            street: data.target.user_street.value,
            first_heighboring_street: data.target.first_heighboring_street.value,
            second_heighboring_street: data.target.second_heighboring_street.value,
            email: data.target.mail.value,
            password: data.target.password.value,
        }
        dispatch(RegisterNewUser(formData))
    }

    if (success) {
        return (<>
            <MessageSuccess message="Usuario Creado" />
            <h2>
                <Link className="m-2 d-flex justify-content-center" to={'/Login/LoginUser'}>Iniciar Sesion!!!</Link>
            </h2>
        </>);
    }

    return (<>
        <form id="register_form" className="form_class" action="formulario.html" method="submit"
            onSubmit={(e) => {
                e.preventDefault()
                handleRegisterUser(e)
            }}>

            <div className="form_div">
                <h4 id="title">Registro de usuario.</h4>

                <hr />
                <br />

                <label className="labelInput">Nombre(s):</label>
                <input type="text" name="nombre" className="field_class" id="nombre" required placeholder="Ingrese su nombre completo" />

                <label className="labelInput">Apellido paterno:</label>
                <input type="text" name="apellido" className="field_class" id="apellido" required placeholder="Ingrese su apellido paterno" />

                <label className="labelInput">Apellido materno:</label>
                <input type="text" name="apellido1" className="field_class" id="apellido1" placeholder="Ingrese su apellido materno" />

                <br />
                <br />

                <label className="labelInput">Natalicio:</label>
                <input type="date" className="field_class" id="birth_date" required />

                <label className="labelInput">Genero:</label>
                <input type="text" list="gender" name="gender" className="field_class" id="user_gender" required placeholder="Seleccione su genero" />
                <datalist id="gender">
                    <option value="Femenino">Mujer</option>
                    <option value="Masculino">Hombre</option>
                    <option value="Ninguno">Prefiero no decirlo</option>
                </datalist>


                <label className="labelInput">Teléfono:</label>
                <input type="number" name="telephone" className="field_class" required placeholder="Ingrese su número de teléfono" />

                <br />
                <br />

                <label className="labelInput">Estado:</label>
                <input type="text" list="estados" name="state" className="field_class" id="user_state" required placeholder="Seleccione el estado" />
                <datalist id="estados">
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Baja California Sur">Baja California Sur</option>
                    <option value="Campeche">Campeche</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="CDMX">Ciudad de México</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Colima">Colima</option>
                    <option value="Durango">Durango</option>
                    <option value="Estado de México">Estado de México</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Michoacán">Michoacán</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Querétaro">Querétaro</option>
                    <option value="Quintana Roo">Quintana Roo</option>
                    <option value="San Luis Potosí">San Luis Potosí</option>
                    <option value="Sinaloa">Sinaloa</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Yucatán">Yucatán</option>
                    <option value="Zacatecas">Zacatecas</option>
                </datalist>

                <label className="labelInput">Ciudad:</label>
                <input type="text" name="ciudad" className="field_class" id="ciudad" placeholder="Ingrese su ciudad" required />

                <label className="labelInput">Colonia:</label>
                <input type="text" name="suburb" className="field_class" id="suburb" placeholder="Ingrese su colonia" required />

                <br />
                <br />

                <label className="labelInput">Codigo Postal:</label>
                <input type="number" name="postal-code" className="field_class" id="postal_code" required placeholder="Ingrese su código postal" />

                <label className="labelInput">Calle:</label>
                <input type="text" name="street" className="field_class" id="user_street" placeholder="Ingrese la calle donde vive" required />

                <label className="labelInput">Primer Calle Vecina:</label>
                <input type="text" name="first_heighboring_street" className="field_class" id="first_heighboring_street" placeholder="Ingrese la prier calle vecina" required />

                <br />
                <br />

                <label className="labelInput">Segunda Calle Vecina:</label>
                <input type="text" name="second_heighboring_street" className="field_class" id="second_heighboring_street" placeholder="Ingrese la segunda calle vecina" required />

                <br />
                <br />

                <label className="labelInput data_important-label">Correo:</label>
                <input type="email" name="user_mail" className="field_class data_important" id="mail" placeholder="Ingrese su correo electronico" required />

                <label className="labelInput data_important-password">Contraseña:</label>
                <input type="password" name="password" className="field_class data_important" id="password" placeholder="Ingrese su contraseña" required />

                <br />
                <br />

                <button className="submit_class" type="submit">Registrarse</button>
                <br />
            </div>

            <div className="info_div">
                <p>¿Ya estás registrado?  <Link to={'/login/LoginUser'}> ¡Ingrese aquí!</Link></p>
            </div>
        </form>

        <footer>
            <p>Creado por <a href="#">MapleSyrup</a></p>
        </footer>

    </>);
}
