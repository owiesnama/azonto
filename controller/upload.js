const multer = require('multer');
const path = require('path');
const constants = require('../config/constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype == 'video/mp4') {
      cb(null, __dirname + '/../uploads/videos/')
    } else {
      cb(new Error('Not supported file type, please choose and mp4 file'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
    storage: storage,
    limits: {
      // in bytes 
      fileSize: constants.VIDEO_SIZE
    },
  })
  .single('video');

exports.upload = upload;