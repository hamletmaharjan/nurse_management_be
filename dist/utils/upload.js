"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageValidator_1 = __importDefault(require("../validators/imageValidator"));
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});
const s3 = new aws.S3({ region: 'us-east-1' });
const storage = multerS3({
    s3: s3,
    bucket: 'hamlet-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (_req, file, cb) {
        cb(null, `${Date.now().toString()}.${file.mimetype.split('/')[1]}`);
    }
});
const upload = multer({ storage: storage, fileFilter: imageValidator_1.default });
/**
 * NOTE: For disk storage.
 */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/images')
//   },
//   filename: function (req, file, cb) {
//       let fileName = file.originalname;
//       let splitted = fileName.split('.');
//     cb(null, file.fieldname + '-' + Date.now() + '.' + splitted[splitted.length-1]);
//   }
// })
// const upload = multer({ storage: storage, fileFilter: imageValidator });
exports.default = upload;
