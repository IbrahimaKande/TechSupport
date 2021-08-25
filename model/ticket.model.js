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
        tech:{
            type: Sequelize.STRING
        },
        user:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.STRING
        },
        requestId:{
            type: Sequelize.INTEGER
        },
        chatroom:{
            type: Sequelize.INTEGER
        },
        messages:{
            type: Sequelize.STRING
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