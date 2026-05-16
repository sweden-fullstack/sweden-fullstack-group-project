import db from "@/config/database"
import UserEntity from "./types/user.entity"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import { userTableName } from "@/utils/tableNames"

class UserRepository {
	async findAll(): Promise<UserEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${userTableName}`,
		)
		return rows.map((o) => o as UserEntity)
	}

	async findById(id: number): Promise<UserEntity | null> {
		console.log()
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${userTableName} WHERE u.id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as UserEntity
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM user WHERE u.email = ?`,
			[email],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as UserEntity
	}

	async create(user: Partial<UserEntity>) {
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${userTableName} SET ?`,
			[user],
		)

		return result.insertId
	}

	async update(id: number, user: Partial<UserEntity>) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${userTableName} SET ? WHERE id = ?`,
			[user, id],
		)

		return result.affectedRows > 0
	}

	async delete(id: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${userTableName} WHERE id = ?`,
			[id],
		)

		return result.affectedRows > 0
	}
}

export default new UserRepository()
