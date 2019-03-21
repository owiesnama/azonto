'use strict';
module.exports = (sequelize, DataTypes) => {
  var attachments = sequelize.define('attachments', {
    attachment_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    folder_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    display_name: DataTypes.STRING,
    size: DataTypes.INTEGER
  }, {});
  attachments.associate = function(models) {
    // associations can be defined here
    attachments.belongsTo(models.users, {as: 'user', foreignKey: 'user_id'})
    attachments.belongsTo(models.folders, {as: 'folder', foreignKey: 'folder_id'})
  };
  return attachments;
};