const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("request",{
        title:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        }
    });

    Request.associate = models => {
        Request.belongsTo(models.User);
    };

    return Request;
};