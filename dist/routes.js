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
const verification_1 = require("./middlewares/verification");
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
router.use('/auth', authRoutes);
router.use('/nurses', verification_1.verification, nurseRoutes);
router.use('/users', userRoutes);
exports.default = router;
