"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// var bodyParser = require('body-parser')
const routes = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// app.get('/', (req: Request, res: Response) => {
//   console.log(req);
//   res.send('Express + TypeScript Server edited');
// });
app.use(express_1.default.json());
app.use('/', routes);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
