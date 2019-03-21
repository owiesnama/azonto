'use strict';
module.exports = (sequelize, DataTypes) => {
  var users_profiles = sequelize.define('users_profiles', {
    profile_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    about: DataTypes.TEXT
  }, {});
  users_profiles.associate = function(models) {
    // associations can be defined here
    users_profiles.belongsTo(models.users, {as: 'user', foreignKey: 'user_id'})
  };
  return users_profiles;
};