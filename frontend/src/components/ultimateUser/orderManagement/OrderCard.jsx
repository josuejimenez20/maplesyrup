import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const OrderCard = ({
  user_name,
  image,
  order_id,
  product_name,
  price,
  quantity,
  city,
  postal_code,
  suburb,
  street,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "1rem" }}>
      <CardHeader title={user_name} subheader={`Order ID: ${order_id}`} />
      {image && (
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt={product_name}
        />
      )}
      <CardContent>
        <Typography variant="h6">{product_name}</Typography>
        <Typography variant="body1">Price: ${price}</Typography>
        <Typography variant="body2">Quantity: {quantity}</Typography>
      </CardContent>
      <IconButton
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        {expanded ? "\u2227" : "\u2228"}
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle1">Additional Details:</Typography>
          <List>
            <ListItem>
              <ListItemText primary="City" secondary={city} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Postal Code" secondary={postal_code} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Suburb" secondary={suburb} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Street" secondary={street} />
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default OrderCard;
