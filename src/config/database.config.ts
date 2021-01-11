const DB = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DBNAME: "latihan"
};

const DIALECT = 'mysql';

const POOL = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}

export { DB, DIALECT, POOL }