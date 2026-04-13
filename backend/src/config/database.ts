import mysql from "mysql2/promise"
import envConfig from "./env"

export const config = {
	host: envConfig.databaseHost,
	user: envConfig.username,
	password: envConfig.password,
	database: envConfig.database,
}

const db = mysql.createPool(config)

export default db
