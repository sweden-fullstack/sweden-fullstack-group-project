import db from "@/config/database"
import UserEntity from "./types/user.entity"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import {
	sectionTableName,
	sectionUserTableName,
	userRoleTableName,
	userTableName,
} from "@/utils/tableNames"

class UserRepository {
	selectQueryBase = `SELECT u.*, su.section_id, su.role_id, s.building_id, ur.name as role FROM ${userTableName} u 
               LEFT JOIN ${sectionUserTableName} su ON u.id = su.user_id
               LEFT JOIN ${userRoleTableName} ur ON ur.id = su.role_id
               LEFT JOIN ${sectionTableName} s ON s.id = su.section_id 
`

	async findAll(): Promise<UserEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(this.selectQueryBase)
		return rows.map((o) => o as UserEntity)
	}

	async findById(id: number): Promise<UserEntity | null> {
		console.log()
		const [rows] = await db.query<RowDataPacket[]>(
			`${this.selectQueryBase} WHERE u.id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as UserEntity
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const [rows] = await db.query<RowDataPacket[]>(
			`${this.selectQueryBase} WHERE u.email = ?`,
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
