'use strict';
module.exports = (sequelize, DataTypes) => {
  var step_types = sequelize.define('step_types', {
    type_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {});
  step_types.associate = function(models) {
    // associations can be defined here
  };
  return step_types;
};