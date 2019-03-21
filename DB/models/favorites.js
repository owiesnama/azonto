'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorites = sequelize.define('favorites', {
    favorite_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    attachment_id: DataTypes.INTEGER
  }, {});
  favorites.associate = function(models) {
    // associations can be defined here
  };
  return favorites;
};