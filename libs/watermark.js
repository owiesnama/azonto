const ffmpeg = require('ffmpeg');
const path = require('path');
const screenshotPath = __dirname + '/../uploads/thumbnails/';
const videoPath = __dirname + '/../uploads/videos/';

try {
  var process = new ffmpeg(path.join(__dirname, '../uploads/videos/akon.mp4'));
  process.then(function (video) {
      console.log('The video is ready to be processed');
      var watermarkPath = path.join(__dirname, '../uploads/v.png'),
        newFilepath = path.join(__dirname, './video-com-watermark.mp4'),
        settings = {
          position: "NE" // Position: NE NC NW SE SC SW C CE CW
            ,
          margin_nord: null // Margin nord
            ,
          margin_sud: null // Margin sud
            ,
          margin_east: null // Margin east
            ,
          margin_west: null // Margin west,
        };
      var callback = function (error, files) {
        if (error) {
          console.log('ERROR: ', error);
        } else {
          console.log('TERMINOU', files);
        }
      }
      //add watermark
      video.fnAddWatermark(watermarkPath, newFilepath, settings, callback)
    },
    function (err) {
      console.log('Error: ' + err);
    });
} catch (e) {
  console.log(e);
  console.log(e.code);
  console.log(e.msg);
}