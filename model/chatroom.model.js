const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Chatroom = sequelize.define("chatroom", {
        requestId:{
            type: Sequelize.INTEGER
        },
        techId:{
            type: Sequelize.INTEGER
        }
    });

    return Chatroom;
}