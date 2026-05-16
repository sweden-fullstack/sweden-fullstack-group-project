import mysql from "mysql2/promise"
import envConfig from "./env"
import { PoolOptions } from "mysql2"

export const config: PoolOptions = {
	host: envConfig.databaseHost,
	user: envConfig.username,
	password: envConfig.password,
	database: envConfig.database,
	dateStrings: true,
}

const db = mysql.createPool(config)

export default db
