import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

export default function CardEditProduct({ product, onEdit, onDelete }) {
    return (
        <Card sx={{ display: 'flex', width: '300px', alignItems: 'center', p: 2 }}>
            <CardMedia
                component="img"
                image={product.path_image}
                alt={product.name}
                sx={{ width: 50, height: 50, marginRight: 2 }}
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Precio: {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Cantidad: {product.count}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onEdit(product.id_product)}
                    sx={{ marginBottom: 1 }}
                >
                    Editar
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onDelete(product.id_product)}
                >
                    Eliminar
                </Button>
            </Box>
        </Card>
    );
}
