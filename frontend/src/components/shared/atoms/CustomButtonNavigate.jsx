import React from 'react';
import { Link } from "react-router-dom";
import { Button, Typography } from '@mui/material';

import '../../../styles/shared/atoms/customButtons/customButtonNavigate.css';

export function CustomButtonNavigate({ label = "", linkTo = "home" }) {
    return (
        <>
            <Button variant='outlined'>

                <Link
                    to={linkTo}
                    style={{
                        color: '#9b9b9b',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    <Typography variant='h6'>{label}</Typography>
                </Link>
            </Button>
        </>
    )
}
