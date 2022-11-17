"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userRoutes = require('./routes/userRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const authRoutes = require('./routes/authRoutes');
router.get('/', (req, res) => {
    res.send('Hello World');
});
router.use('/auth', authRoutes);
router.use('/nurses', nurseRoutes);
router.use('/users', userRoutes);
module.exports = router;
