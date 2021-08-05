const { queryInterface } = require("sequelize");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Tickets = sequelize.define("tickets",{
        Title:{
            type: Sequelize.STRING
        },
        userName:{
            type: Sequelize.STRING
        },
        TechName:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.BOOLEAN
        },
    });
    return Tickets;
};