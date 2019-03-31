'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('videos', {
      video_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },      
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },      
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },      
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },      
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      player: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      views: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },      
      thumbnail: {
        type: Sequelize.STRING
      },      
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },      
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: 'category_id'
        }
      },      
      created_at: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('videos');
  }
};