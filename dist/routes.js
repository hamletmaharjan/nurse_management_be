"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const nurseRoutes_1 = __importDefault(require("./routes/nurseRoutes"));
const verification_1 = require("./middlewares/verification");
router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
router.use('/auth', authRoutes_1.default);
router.use('/nurses', verification_1.verification, nurseRoutes_1.default);
exports.default = router;
