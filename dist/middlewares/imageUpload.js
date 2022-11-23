"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = __importDefault(require("../utils/upload"));
const singleUpload = upload_1.default.single('image');
const imageUpload = (req, res, next) => {
    singleUpload(req, res, function (err) {
        console.log('req', req.file);
        if (err) {
            return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err }] });
        }
        next();
    });
};
exports.default = imageUpload;
