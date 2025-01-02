import React from "react";
import { Stack } from '@mui/material';
import { UltimateUserRouter } from "../../router/ultimateUser/UltimateUserRouter";
import { CustomButtonNavigate } from "../shared/atoms/CustomButtonNavigate";

export function UltimateUser() {
    return (
        <>
            <Stack 
                direction="row" 
                spacing={4}
                sx={{
                    display: 'flex',
                    justifyContent: 'center', 
                    alignItems: 'center',  
                    mt: 4,  
                    marginBottom: '1em'
                }}
            >
                <CustomButtonNavigate label='Agregar Productos' linkTo='AddProducts' />
                <CustomButtonNavigate label='Editar Producto' linkTo='edit-product' />
                <CustomButtonNavigate label='Pedidos' linkTo='order-management' />
            </Stack>
            <UltimateUserRouter />
        </>
    );
}
