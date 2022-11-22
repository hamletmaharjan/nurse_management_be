"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const nurseController_1 = require("../controllers/nurseController");
router.get('/', nurseController_1.fetchAll);
router.post('/', nurseController_1.create);
router.put('/:nurseId', nurseController_1.update);
router.delete('/:nurseId', nurseController_1.deleteNurse);
module.exports = router;
