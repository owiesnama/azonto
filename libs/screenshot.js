const ffmpeg = require('fluent-ffmpeg')
const screenshotPath = __dirname + '/../uploads/';

new ffmpeg(screenshotPath + 'video-1553077484174.mp4')
  .on('filenames', function (filenames) {
    console.log(`generating screenshot.. [${filenames}]`);
  })
  .takeScreenshots({
    count: 1,
    filename: 'thumbnail-' + Date.now(),
    timemarks: ['600'] // number of seconds,
  }, screenshotPath, function (err) {
    console.log('screenshots were saved')
  });