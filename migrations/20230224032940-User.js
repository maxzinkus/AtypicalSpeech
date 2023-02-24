'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assignedTasks: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      completedTasks: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      taskProgress: {
        type: DataTypes.JSON,
        allowNull: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
