import React from "react";

export function MessageSuccess({ message = "LOGRADO" }) {
    return (<>
        <div className="alert alert-success">
            <h1 className="">Exito</h1>
            <h2>
                {message}
            </h2>
        </div>
    </>);
}

export function MessageError({ message = "Error" }) {
    return (<>
        <div className="alert alert-danger">
            <h1 className="">Error</h1>
            <h2>
                {message}
            </h2>
        </div>
    </>)
}
