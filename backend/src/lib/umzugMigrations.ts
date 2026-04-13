// migrate.js
import {
	Umzug,
	SequelizeStorage,
	RunnableMigration,
	MigrationParams,
} from "umzug"
import { Options, Sequelize } from "sequelize"
import fs from "fs/promises"
import path from "path"
import envConfig from "@/config/env"

export const config: Options = {
	host: envConfig.databaseHost,
	username: envConfig.username,
	password: envConfig.password,
	database: envConfig.database,
	dialect: "mysql",
	dialectOptions: {
		multipleStatements: true,
	},
}

const sequelize = new Sequelize(config)

// Read all SQL files, parse version, sort ascending
async function getFlywayMigrations() {
	const migrationsDir = path.join(process.cwd(), "src", "migrations")
	const files = await fs.readdir(migrationsDir)

	const migrations = []
	for (const file of files) {
		let match = file.match(/^V(\d+)__(.+)\.sql$/)
		if (!match) {
			match = file.match(/^V(\d+)_(.+)\.sql$/)
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

type MigrationContext = {
	sequelize: Sequelize
}

const migrations: RunnableMigration<MigrationContext>[] = flywayMigrations.map(
	(o) => ({
		name: o.name,
		up: async ({ context }: MigrationParams<MigrationContext>) => {
			await context.sequelize.query(o.sql)
		},
	}),
)

const umzug = new Umzug({
	migrations: migrations,
	context: { sequelize },
	storage: new SequelizeStorage({
		sequelize,
		tableName: "schema_history",
	}),
	logger: console,
})

export default umzug
