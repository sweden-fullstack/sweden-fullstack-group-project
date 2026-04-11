import mysql from "mysql2/promise"

export const config = {
	host: "localhost",
	user: "sweden-fullstack-group-project",
	password: "sweden-fullstack-group-project",
	database: "sweden-fullstack-group-project",
}

const db = mysql.createPool(config)

export default db
