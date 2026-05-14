import db from "@/config/database"
import UserEntity from "./types/user.entity"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import UserCreate from "@/shared/types/user/user.create"
import UserUpdate from "@/shared/types/user/user.update"
import { tableName as sectionUserTableName } from "@/modules/section-user/sectionUser.repository"
import { tableName as userRoleTableName } from "@/modules/user-role/userRole.repository"
import { tableName as sectionTableName } from "@/modules/section/section.repository"

const tableName = "user"

class UserRepository {
	selectQueryBase = `SELECT u.*, su.section_id, su.role_id, s.building_id, ur.name as role FROM ${tableName} u 
               LEFT JOIN ${sectionUserTableName} su ON u.id = su.user_id
               LEFT JOIN ${userRoleTableName} ur ON ur.id = su.role_id
               RIGHT JOIN ${sectionTableName} s ON s.id = su.section_id`

	async findAll(): Promise<UserEntity[]> {
		const [rows] = await db.query<RowDataPacket[]>(this.selectQueryBase)
		return rows.map((o) => o as unknown as UserEntity)
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
