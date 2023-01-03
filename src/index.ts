import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import swaggerOptions from './swaggerConfig';

import cors from 'cors';

import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use('/', routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

const specs = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

export default app;