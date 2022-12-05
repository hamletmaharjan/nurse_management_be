import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const cors = require('cors');

import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use('/', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;