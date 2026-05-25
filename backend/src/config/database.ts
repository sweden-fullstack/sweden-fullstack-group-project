import mysql from "mysql2/promise"
import envConfig from "./env"
import { PoolOptions } from "mysql2"

export const config: PoolOptions = {
	host: envConfig.databaseHost,
	user: envConfig.username,
	password: envConfig.password,
	database: envConfig.database,
	port: envConfig.databasePort,
	dateStrings: true,
	ssl:
		process.env.DB_SSL === "true"
			? {
					rejectUnauthorized: false,
				}
			: undefined,
}

const pool = mysql.createPool(config)
const db = await pool.getConnection()

export default db
