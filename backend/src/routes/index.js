import express from "express";
import userRouter from "./users/usersRoutes.js";
import productRouter from "./products/productsRoutes.js";
import loginRouter from "./login/loginRoutes.js";
import paypalRouter from "./paypal/paypalRoutes.js";
import healthCheckRouter from "./health_check.js";

const app = express();

// Usuarios 
app.use('/users', userRouter);
// // Products
app.use('/products', productRouter);
// // Login
app.use('/login', loginRouter);
// // Paypal
app.use('/paypal', paypalRouter);

app.use('/health-check', healthCheckRouter)

export default app;