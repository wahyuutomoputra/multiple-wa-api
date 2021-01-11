"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = require("../../config/database.config");
const connect = new sequelize_1.Sequelize(database_config_1.DB.DBNAME, database_config_1.DB.USER, database_config_1.DB.PASSWORD, {
    host: database_config_1.DB.HOST,
    dialect: database_config_1.DIALECT,
    pool: {
        max: database_config_1.POOL.max,
        min: database_config_1.POOL.min,
        acquire: database_config_1.POOL.acquire,
        idle: database_config_1.POOL.idle
    },
});
exports.default = connect;
