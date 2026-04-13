import db from "@/config/database"
import UserEntity from "./types/user.entity"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import typia from "typia"
import UserCreate from "@/shared/types/user/user.create"
import UserUpdate from "@/shared/types/user/user.update"

const tableName = "user_example"

class UserRepository {
	async findAll(): Promise<UserEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName}`,
		)
		return rows.map((row) =>
			typia.misc.assertPrune<UserEntity>(row as unknown as UserEntity),
		)
	}

	async findByUsername(username: string): Promise<UserEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName} WHERE username = ?`,
			[username],
		)

		console.log(`USERNAME ${username}`)

		console.log("FOUND ")
		console.log("TEST" + rows)

		if (rows.length === 0) return null
		return typia.misc.assertPrune<UserEntity>(
			rows[0] as unknown as UserEntity,
		)
	}

	async create(user: UserCreate) {
		await db.query<ResultSetHeader>(`INSERT INTO ${tableName} SET ?`, [
			user,
		])

		return user.username
	}

	async update(username: string, user: UserUpdate) {
		console.log(`USERNAME ${username}`)
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${tableName} SET ? WHERE username = ?`,
			[user, username],
		)

		console.log(`USERNAME 2${username}`)
		return result.affectedRows > 0
	}

	async delete(username: string) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${tableName} WHERE username = ?`,
			[username],
		)

		return result.affectedRows > 0
	}
}

export default new UserRepository()
