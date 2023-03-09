import React from "react";
import { UltimateUserRouter } from "../../router/ultimateUser/UltimateUserRouter";
import { CustomButtonNavigate } from "../shared/atoms/CustomButtonNavigate";

export function UltimateUser() {
    return (<>
        <div className='containerTopNavBar'>
            <CustomButtonNavigate label='Agregar Productos' linkTo='AddProducts' />
            <CustomButtonNavigate label='Editar Producto' linkTo='AddProducts' />
            <CustomButtonNavigate label='Administracion de Usuarios' linkTo='AddProducts' />
        </div>
        <UltimateUserRouter />
    </>);
}
