// migrate.js
import { Umzug, SequelizeStorage } from "umzug"
import { Sequelize } from "sequelize"
import fs from "fs/promises"
import path from "path"
import { config } from "../config/database.ts"

const sequelize = new Sequelize(config)

// Read all SQL files, parse version, sort ascending
async function getFlywayMigrations() {
	const migrationsDir = path.join(process.cwd(), "migrations")
	const files = await fs.readdir(migrationsDir)

	const migrations = []
	for (const file of files) {
		let match = file.match(/^V?(\d+)[_]{2}(.+)\.sql$/)
		if (!match) {
			match = file.match(/^V?(\d+)[_]{1}(.+)\.sql$/)
		}
		if (!match) continue

		const version = parseInt(match[1], 10)
		const description = match[2]
		const filePath = path.join(migrationsDir, file)
		const sql = await fs.readFile(filePath, "utf-8")

		migrations.push({
			name: file,
			version,
			description,
			sql,
		})
	}

	migrations.sort((a, b) => a.version - b.version)
	return migrations
}

const flywayMigrations = await getFlywayMigrations()

const umzug = new Umzug({
	migrations: flywayMigrations.map((m) => ({
		name: m.name,
		up: async ({ context }) => {
			await context.sequelize.query(m.sql)
		},
	})),
	context: { sequelize },
	storage: new SequelizeStorage({
		sequelize,
		tableName: "schema_history",
	}),
	logger: console,
})

await umzug.up()
