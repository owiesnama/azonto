'use strict';
module.exports = (sequelize, DataTypes) => {
  var steps = sequelize.define('steps', {
    step_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    order: DataTypes.INTEGER,
    workflow_id: DataTypes.INTEGER,
    initiator_id: DataTypes.INTEGER,
    type_id: DataTypes.STRING
  }, {});
  steps.associate = function(models) {
    // associations can be defined here
    steps.belongsTo(models.workflows, {as: 'workflow', foreignKey: 'workflow_id'})
    steps.belongsTo(models.users, {as: 'initiator', foreignKey: 'initiator_id'})
    steps.belongsTo(models.step_types, {as: 'step_type', foreignKey: 'type_id'})
  };
  return steps;
};