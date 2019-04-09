'use strict';
module.exports = (sequelize, DataTypes) => {
  var featured_videos = sequelize.define('featured_videos', {
    featured_video_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    video_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {});
  featured_videos.associate = function(models) {
    // associations can be defined here
    featured_videos.belongsTo(models.videos, {as: 'video', foreignKey: 'video_id'})
  };
  return featured_videos;
};