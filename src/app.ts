import express from "express";
import cors from "cors";
import orderRoutes from "./router/orders/order.router";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './server/swagger';
import authRouter from "./router/auth/auth.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRouter)

export default app;
