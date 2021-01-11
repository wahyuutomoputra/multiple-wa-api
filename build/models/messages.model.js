"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../lib/system/database"));
class Messages extends sequelize_1.Model {
}
Messages.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    from: {
        type: sequelize_1.DataTypes.STRING
    },
    isForwarded: {
        type: sequelize_1.DataTypes.STRING
    },
    location: {
        type: sequelize_1.DataTypes.STRING
    },
    timestamp: {
        type: sequelize_1.DataTypes.STRING
    },
    to: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    body: {
        type: sequelize_1.DataTypes.STRING
    },
    fromMe: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_1.default,
    modelName: "messages",
    freezeTableName: true
});
exports.default = Messages;
