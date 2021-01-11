"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POOL = exports.DIALECT = exports.DB = void 0;
const DB = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DBNAME: "latihan"
};
exports.DB = DB;
const DIALECT = 'mysql';
exports.DIALECT = DIALECT;
const POOL = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};
exports.POOL = POOL;
