import React from "react";
import { Stack } from '@mui/material';
import { UltimateUserRouter } from "../../router/ultimateUser/UltimateUserRouter";
import { CustomButtonNavigate } from "../shared/atoms/CustomButtonNavigate";

export function UltimateUser() {
    return (
        <>
            <Stack 
                direction="row" 
                spacing={4} // Espaciado entre los botones
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // Centra horizontalmente
                    alignItems: 'center',    // Alinea verticalmente
                    mt: 4,  
                    marginBottom: '1em'                // Espaciado superior opcional
                }}
            >
                <CustomButtonNavigate label='Agregar Productos' linkTo='AddProducts' />
                <CustomButtonNavigate label='Editar Producto' linkTo='EditProduct' />
                <CustomButtonNavigate label='Administración de Usuarios' linkTo='UserManagement' />
            </Stack>
            <UltimateUserRouter />
        </>
    );
}
