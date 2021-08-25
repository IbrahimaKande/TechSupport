const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("request",{
        title:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER
        },
        available:{
            type: Sequelize.BOOLEAN
        }
    });

    Request.associate = model => {
        Request.belongsTo(model.user.model, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };

    return Request;
};