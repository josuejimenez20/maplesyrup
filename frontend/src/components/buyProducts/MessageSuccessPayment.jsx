import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MessageError } from "../shared/molecules/AlertMessages";

export function MessageSuccessPayment() {

    const { loading, success, error } = useSelector((state) => state.products.paymentProduct);

    useEffect(() => {
        if (error) {
            return (<>
                <MessageError message="Hubo un error con su pago, por favor contacte a MapleSyrup
                para mas informacion"/>
                <a href="https://instagram.com/_miel.demaple?igshid=YmMyMTA2M2Y=">VIA INSTAGRAM</a>
            </>)
        }
    }, [error])

    return (<>
        <h3 className="alert alert-info">
            Se realizo su pago!!!! <br />
            En unos instantes le vamos a mandar toda la informacion
            de su compra mediante un correo
        </h3>

        <Link to={'/home'} className="btn btn-dark"> Regresar al inicio</Link>
    </>);
}
