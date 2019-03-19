'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.STRING,
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};