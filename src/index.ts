import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// var bodyParser = require('body-parser')

const routes = require("./routes");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// app.get('/', (req: Request, res: Response) => {
//   console.log(req);
//   res.send('Express + TypeScript Server edited');
// });

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});