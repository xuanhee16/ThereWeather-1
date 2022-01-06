const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    development: {
        username: process.env.MYSQL_ID || "root",
        password: process.env.MYSQL_PASSWORD || "1234",
        database: process.env.MYSQL_NAME || "there_weather",
        host: "127.0.0.1",
        dialect: "mysql",
        timezone: "+09:00",
    },
    test: {
        username: process.env.MYSQL_ID || "root",
        password: process.env.MYSQL_PASSWORD || "1234",
        database: process.env.MYSQL_NAME || "TWD",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: process.env.MYSQL_ID || "root",
        password: process.env.MYSQL_PASSWORD || "1234",
        database: process.env.MYSQL_NAME || "TWD",
        host: "127.0.0.1",
        dialect: "mysql",
    },
}
