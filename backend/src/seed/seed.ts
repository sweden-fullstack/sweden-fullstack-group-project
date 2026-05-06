import db from "../config/database"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function seedDB() {
	const sqlPath = path.join(__dirname, "seed.sql")
	const sqlContent = fs.readFileSync(sqlPath, "utf8")

	try {
		const statements = sqlContent
			.split(";")
			.map((stmt) => stmt.trim())
			.filter((stmt) => stmt.length > 0)

		for (const statement of statements) {
			await db.execute(statement)
		}

		console.log("Seeding completed successfully.")
	} finally {
		await db.end()
	}
}

seedDB().catch((err) => {
	console.error("Seeding failed:", err)
	process.exitCode = 1
})
