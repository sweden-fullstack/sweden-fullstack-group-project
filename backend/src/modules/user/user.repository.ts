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
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${tableName} SET ? WHERE username = ?`,
			[user, username],
		)

		return result.affectedRows > 0
	}

	async delete(username: string) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${tableName} WHERE username = ?`,
			[username],
		)

		return result.affectedRows > 0
	}

	// If using complex query with multiple fields make it transactional, I.E if one command fails rollback so we are not in invalid state like so
	// async example() {
	//    const conn = await db.getConnection()
	//    try {
	//       await conn.beginTransaction()
	//
	//       // modifications to tables
	//
	//       await conn.commit()
	//    } catch (err) {
	//       await conn.rollback()
	//       throw err
	//    } finally {
	//       conn.release()
	//    }
	// }
}

export default new UserRepository()
