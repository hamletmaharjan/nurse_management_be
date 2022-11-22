"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageValidator_1 = __importDefault(require("../validators/imageValidator"));
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1' // region of your bucket
});
const s3 = new S3Client();
const storage = multerS3({
    s3: s3,
    bucket: 'hamlet-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, 'hamlet-bucket' + '.s3.amazonaws.com/' + Date.now().toString());
    }
});
const upload = multer({ storage: storage, fileFilter: imageValidator_1.default });
exports.default = upload;
