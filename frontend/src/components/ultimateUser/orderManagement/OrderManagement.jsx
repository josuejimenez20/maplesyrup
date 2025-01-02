import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import Grid from '@mui/material/Grid2';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrdersAction } from "../../../redux/actions/ultimateUser/orderManagement/getAllOrders";
import OrderCard from "./OrderCard";

export default function OrderManagement() {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.ultimateUser.list);

  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch]);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  if (orders.length === 0) {
    return <Typography>No hay órdenes disponibles.</Typography>;
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      {orders.map((element, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <OrderCard
            user_name={element.user_name}
            product_name={element.product_name}
            price={element.price}
            city={element.city}
            image={element.path_image}
            order_id={element.order_id}
            postal_code={element.postal_code}
            quantity={element.quantity}
            street={element.street}
            suburb={element.suburb}
          />
        </Grid>
      ))}
    </Grid>
  );
}
