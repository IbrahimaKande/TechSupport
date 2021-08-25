const dbConfig = require("../db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.techs = require("./tech.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.tickets = require("./ticket.model")(sequelize, Sequelize);
db.request = require("./request.model")(sequelize, Sequelize);
db.chatroom = require("./chatroom.model")(sequelize, Sequelize);
db.message = require("./message.model")(sequelize, Sequelize);

module.exports = db;