const { queryInterface } = require("sequelize");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Tickets = sequelize.define("tickets",{
        topic:{
            type: Sequelize.STRING
        },
        techId:{
            type: Sequelize.INTEGER
        },
        status:{
            type: Sequelize.STRING
        },
        requestId:{
            type: Sequelize.INTEGER
        },
        chatroom:{
            type: Sequelize.INTEGER
        }
    });

    Tickets.associate = model => {
        Tickets.belongsTo(model.request.model, {
            foreignKey: 'requestId',
            onDelete: 'CASCADE'
        });
    };

    Tickets.associate = model => {
        Tickets.belongsTo(model.user.model, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    
    Tickets.associate = model => {
        Tickets.belongsTo(model.tech.model, {
            foreignKey: 'techId',
            onDelete: 'CASCADE'
        });
    };

    return Tickets;
};