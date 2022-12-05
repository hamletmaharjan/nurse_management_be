"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageValidator_1 = __importDefault(require("../validators/imageValidator"));
const multer_1 = __importDefault(require("multer"));
/**
 * NOTE: For disk storage.
 */
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        let splitted = fileName.split('.');
        cb(null, file.fieldname + '-' + Date.now() + '.' + splitted[splitted.length - 1]);
    }
});
const upload = (0, multer_1.default)({ storage: storage, fileFilter: imageValidator_1.default });
exports.default = upload;
