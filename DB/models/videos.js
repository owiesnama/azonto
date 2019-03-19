'use strict';
module.exports = (sequelize, DataTypes) => {
  var videos = sequelize.define('videos', {
    video_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    player: DataTypes.STRING,
    views: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    status_id: DataTypes.INTEGER
  }, {});
  videos.associate = function(models) {
    // associations can be defined here
  };
  return videos;
};