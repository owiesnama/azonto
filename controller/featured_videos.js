const FeaturedVideosService = require('../services/FeaturedVideosService');

exports.list = (req, response, next) => {
  const pageSize = req.query.page_size ? parseInt(req.query.page_size) : 20;
  const pageNumber = req.query.page_number ? parseInt(req.query.page_number) : 0;

  new FeaturedVideosService().findAll(null, pageSize, pageNumber)
    .then((result) => {
      req.featuredVideos = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
    });
}

exports.create = (req, response, next) => {
  const featuredVideo = {
    video_id: req.body.video_id
  };

  new FeaturedVideosService().create(featuredVideo)
    .then((result) => {
      req.featured = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.updateOrder = (req, response, next) => {
  new FeaturedVideosService().updateOrder(req.body)
    .then((result) => {
      // req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}

exports.delete = (req, response, next) => {
  const featuredVideoId = parseInt(req.params.featured_video_id);

  new FeaturedVideosService().delete({
      featured_video_id: featuredVideoId
    })
    .then((result) => {
      req.result = result;
      next();
    }).catch((error) => {
      response.status(error.code ? error.code : 500).send(error.message ? error.message : error);
      console.log('\n---------------- error ----------------\n'.red, error);
    });
}