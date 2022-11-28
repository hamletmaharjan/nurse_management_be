import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const cors = require('cors');

const routes = require("./routes");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;