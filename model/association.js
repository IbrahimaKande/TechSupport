const { sequelize, Sequelize } = require(".");

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'requests', // name of Source model
        'userId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'requests', // name of Source model
        'userId' // key we want to remove
      );
    }
  };