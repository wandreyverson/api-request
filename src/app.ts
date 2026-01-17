import express from "express";
import cors from "cors";
import orderRoutes from "./router/order.router";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './server/swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/orders", orderRoutes);

export default app;
  