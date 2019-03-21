'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('steps', {
      step_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      workflow_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'workflows',
          key: 'workflow_id'
        }
      },
      initiator_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'user_id'
        }
      },
      type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'step_types',
          key: 'type_id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('steps');
  }
};