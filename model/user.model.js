const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user",{
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
        company:{
            type: Sequelize.STRING
        }
    });

    return User;
};