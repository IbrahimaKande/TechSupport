const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        text:{
            type: Sequelize.STRING
        },
        chatroomId:{
            type: Sequelize.INTEGER
        },
        sentBy:{
            type: Sequelize.STRING
        },
    });

    return Message;
}