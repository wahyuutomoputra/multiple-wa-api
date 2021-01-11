"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../lib/system/database"));
class Device extends sequelize_1.Model {
}
Device.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.STRING
    },
    apiKey: {
        type: sequelize_1.DataTypes.STRING(300),
    },
    WABrowserId: {
        type: sequelize_1.DataTypes.STRING(300)
    },
    WASecretBundle: {
        type: sequelize_1.DataTypes.STRING(300)
    },
    WAToken1: {
        type: sequelize_1.DataTypes.STRING(300)
    },
    WAToken2: {
        type: sequelize_1.DataTypes.STRING(300)
    }
}, {
    sequelize: database_1.default,
    freezeTableName: true,
    modelName: "devices"
});
exports.default = Device;
