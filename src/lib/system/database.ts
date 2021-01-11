import { Sequelize } from "sequelize";
import { DB, POOL, DIALECT } from "../../config/database.config";

const connect = new Sequelize(DB.DBNAME, DB.USER, DB.PASSWORD, {
    host: DB.HOST,
    dialect: DIALECT,
    pool: {
        max: POOL.max,
        min: POOL.min,
        acquire: POOL.acquire,
        idle: POOL.idle
    },
})

export default connect;