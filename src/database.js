const mysql = require("mysql");

const pool = mysql.createPool({
    host: "92.204.220.200",
    user: "AdminHarvey",
    password: "40m2[s3^=NHo",
    database: "therai"
});

const connectionPool = () => pool;
module.exports = { connectionPool }; 