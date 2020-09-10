const Sequelize = require('sequelize');

const sequelize = new Sequelize('concedii', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        freezeTableName: true,
        timestamps: false,
        operatorsAliases: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employee = require('../model/employee.model.js')(sequelize, Sequelize);
db.records = require('../model/records.model.js')(sequelize, Sequelize);
db.company = require('../model/company.model.js')(sequelize, Sequelize);
db.templates = require('../model/templates.model.js')(sequelize, Sequelize);

module.exports = db;
