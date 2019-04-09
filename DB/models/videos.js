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
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    player: DataTypes.STRING,
    views: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING,
    status_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  videos.associate = function(models) {
    // associations can be defined here
    videos.belongsTo(models.categories, {as: 'category', foreignKey: 'category_id'})
    videos.hasOne(models.featured_videos, {as: 'featured_video', foreignKey: 'video_id'})
  };
  return videos;
};