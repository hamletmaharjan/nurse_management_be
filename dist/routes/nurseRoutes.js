"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const imageUpload_1 = __importDefault(require("../middlewares/imageUpload"));
const nurseController_1 = require("../controllers/nurseController");
/**
 * @swagger
 * tags:
 *   name: Nurses
 *   description: The nurses managing API
 * /nurses:
 *   get:
 *     summary: Get the nurses.
 *     tags:
 *       - Nurse
 *     responses:
 *       200:
 *         description: Get all the nurses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  nurses:
 *                    type: array
 *                    items:
 *                     $ref: '#/components/schemas/Nurse'
 */
router.get('/', nurseController_1.fetchAll);
router.post('/', imageUpload_1.default, nurseController_1.create);
router.get('/:nurseId', nurseController_1.fetchById);
router.put('/:nurseId', imageUpload_1.default, nurseController_1.update);
router.delete('/:nurseId', nurseController_1.deleteNurse);
router.patch('/:nurseId/set-rounding-manager', nurseController_1.updateRoundingManager);
exports.default = router;
