import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { EditInformationUser } from '../../redux/actions/user/EditInformationUser';
import '../../styles/login/registerUser.css';

export function UserEditForm() {

    const dispatch = useDispatch();
    const params = useParams();

    const { loading, success, error, userData
    } = useSelector((state) => state.users.information);

    const [birthDate, setBirthDate] = useState();

    useEffect(() => {
        if (userData.birth_date) {
            const birth_date = userData.birth_date.split('T')[0];
            setBirthDate(birth_date);
        }
    }, [userData])

    const handleEditInformationUser = (data) => {
        const id_user = params.id_user;

        const formData = {
            id_user,
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
        dispatch(EditInformationUser(formData))
    }

    return (
        <>
            {loading ? '' :
                <form id="register_form" className="form_class" action="formulario.html" method="submit"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleEditInformationUser(e)
                    }}>
                    <div className="form_div">
                        <h4 id="title">Editar informacion de usuario.</h4>

                        <hr />
                        <br />

                        <label className="labelInput">Nombre(s):</label>
                        <input type="text" name="nombre" className="field_class" id="nombre"
                            required placeholder="Ingrese su nombre completo" defaultValue={userData.names} />

                        <label className="labelInput">Apellido paterno:</label>
                        <input type="text" name="apellido" className="field_class" id="apellido"
                            placeholder="Ingrese su apellido paterno" defaultValue={userData.last_name} />

                        <label className="labelInput">Apellido materno:</label>
                        <input type="text" name="apellido1" className="field_class" id="apellido1"
                            placeholder="Ingrese su apellido materno" defaultValue={userData.second_last_name} />

                        <br />
                        <br />

                        <label className="labelInput">Natalicio:</label>
                        <input type="date" className="field_class" id="birth_date" required defaultValue={birthDate} />

                        <label className="labelInput">Genero:</label>
                        <input type="text" list="gender" name="gender" className="field_class" id="user_gender"
                            required placeholder="Seleccione su genero" defaultValue={userData.gender} />
                        <datalist id="gender">
                            <option value="Femenino">Mujer</option>
                            <option value="Masculino">Hombre</option>
                            <option value="Ninguno">Prefiero no decirlo</option>
                        </datalist>


                        <label className="labelInput">Teléfono:</label>
                        <input type="number" name="telephone" className="field_class"
                            required placeholder="Ingrese su número de teléfono" defaultValue={userData.telephone} />

                        <br />
                        <br />

                        <label className="labelInput">Estado:</label>
                        <input type="text" list="estados" name="state" className="field_class" id="user_state"
                            required placeholder="Seleccione el estado" defaultValue={userData.state} />
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
                        <input type="text" name="ciudad" className="field_class" id="ciudad" placeholder="Ingrese su ciudad"
                            required defaultValue={userData.city} />

                        <label className="labelInput">Colonia:</label>
                        <input type="text" name="suburb" className="field_class" id="suburb" placeholder="Ingrese su colonia"
                            required defaultValue={userData.suburb} />

                        <br />
                        <br />

                        <label className="labelInput">Codigo Postal:</label>
                        <input type="number" name="postal-code" className="field_class" id="postal_code"
                            required placeholder="Ingrese su código postal" defaultValue={userData.postal_code} />

                        <label className="labelInput">Calle:</label>
                        <input type="text" name="street" className="field_class" id="user_street"
                            placeholder="Ingrese la calle donde vive" required defaultValue={userData.street} />

                        <label className="labelInput">Primer Calle Vecina:</label>
                        <input type="text" name="first_heighboring_street" className="field_class" id="first_heighboring_street"
                            placeholder="Ingrese la prier calle vecina" required defaultValue={userData.first_heighboring_street} />

                        <br />
                        <br />

                        <label className="labelInput">Segunda Calle Vecina:</label>
                        <input type="text" name="second_heighboring_street" className="field_class" id="second_heighboring_street"
                            placeholder="Ingrese la segunda calle vecina" required defaultValue={userData.second_heighboring_street} />

                        <br />
                        <br />

                        <label className="labelInput data_important-label">Correo:</label>
                        <input type="email" name="user_mail" className="field_class data_important" id="mail" placeholder="Ingrese su correo electronico"
                            required defaultValue={userData.email} />

                        <label className="labelInput data_important-password">Contraseña:</label>
                        <input type="password" name="password" className="field_class data_important" id="password"
                            placeholder="Ingrese su contraseña" required defaultValue={userData.password} />

                        <br />
                        <br />

                        <button className="submit_class" type="submit">Editar Informacion</button>
                        <br />
                    </div>
                </form>
            }
        </>
    );
}
