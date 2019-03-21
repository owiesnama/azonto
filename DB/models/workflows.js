'use strict';
module.exports = (sequelize, DataTypes) => {
  var workflows = sequelize.define('workflows', {
    workflow_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  workflows.associate = function(models) {
    // associations can be defined here
  };
  return workflows;
};