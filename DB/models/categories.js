'use strict';
module.exports = (sequelize, DataTypes) => {
  var categories = sequelize.define('categories', {
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};