import imageValidator from '../validators/imageValidator';

const multer = require('multer');
const multerS3 = require('multer-s3');

const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});

const s3 = new aws.S3({region: 'us-east-1'});
const storage = multerS3({
    s3: s3,
    bucket: 'hamlet-bucket',
    acl: 'public-read',
    metadata: function (req:any, file:any, cb:any) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (_req: any, file: {mimetype: string}, cb: (arg0: null, arg1: string) => void) {
      cb(null, `${Date.now().toString()}.${file.mimetype.split('/')[1]}`)
    }
  })
const upload = multer({ storage: storage, fileFilter: imageValidator });

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


export default upload;