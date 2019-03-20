'use strict';
module.exports = (sequelize, DataTypes) => {
  var messages = sequelize.define('messages', {
    message_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sender: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};