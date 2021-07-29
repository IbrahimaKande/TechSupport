const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Tech = sequelize.define("tech",{
        firstName:{
            type: Sequelize.STRING
        },
        lastName:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
        nTickets:{
            type: Sequelize.INTEGER
        }
    });

    return Tech;
};