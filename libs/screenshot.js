const ffmpeg = require('fluent-ffmpeg')
const screenshotPath = __dirname + '/../uploads/screenshots/';
const videoPath = __dirname + '/../uploads/videos/';

exports.takeScreenshot = (req, response, next) => {
  const videoName = req.file.filename;

  new ffmpeg(videoPath + videoName)
    .on('filenames', function (filenames) {
      req.thumbnail = filenames;

      console.log(`generating screenshot.. [${filenames}]`);
    })
    .takeScreenshots({
      count: 1,
      filename: 'thumbnail-' + Date.now(),
      timemarks: ['1'] // number of seconds,
    }, screenshotPath, function (err) {
      console.log('screenshots were saved')
    });
  next();
}