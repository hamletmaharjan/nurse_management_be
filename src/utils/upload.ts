import imageValidator from '../validators/imageValidator';

import multer from 'multer';

/**
 * NOTE: For disk storage.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname;
    const splitted = fileName.split('.');

    cb(
      null,
      file.fieldname + '-' + Date.now() + '.' + splitted[splitted.length - 1],
    );
  },
});

const upload = multer({ storage: storage, fileFilter: imageValidator });

export default upload;
