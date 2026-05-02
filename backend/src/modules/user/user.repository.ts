import db from "@/config/database"
import UserEntity from "./types/user.entity"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import UserCreate from "@/shared/types/user/user.create"
import UserUpdate from "@/shared/types/user/user.update"

const tableName = "user"

class UserRepository {
	async findAll(): Promise<UserEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName}`,
		)
		return rows.map((o) => o as unknown as UserEntity)
	}

	async findById(id: number): Promise<UserEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${tableName} WHERE id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as UserEntity
	}

	async create(user: UserCreate) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${tableName} SET ?`,
			[user],
		)

		return result.insertId
	}

	async update(id: number, user: UserUpdate) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${tableName} SET ? WHERE id = ?`,
			[user, id],
		)

		return result.affectedRows > 0
	}

	async delete(id: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${tableName} WHERE id = ?`,
			[id],
		)

		return result.affectedRows > 0
	}
}

export default new UserRepository()
