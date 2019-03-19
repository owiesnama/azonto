'use strict';
module.exports = (sequelize, DataTypes) => {
  var folders = sequelize.define('folders', {
    folder_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    parent_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, {});
  folders.associate = function(models) {
    // associations can be defined here
    folders.hasMany(models.folders, {as: 'sub_folder', foreignKey: 'parent_id'})
    folders.belongsTo(models.users, {as: 'owner', foreignKey: 'owner_id'})
    folders.hasMany(models.attachments, {as: 'attachments', foreignKey: 'folder_id'})
  };
  return folders;
};