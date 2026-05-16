import db from "@/config/database"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import SectionUserEntity from "./types/sectionUser.entity"
import { tableName as userTableName } from "@/modules/user/user.repository"
import { tableName as userRoleTableName } from "@/modules/user-role/userRole.repository"
import { tableName as sectionTableName } from "@/modules/section/section.repository"

export const tableName = "section_user"

class SectionUserRepository {
	selectQueryBase = `SELECT su.*, u.email, u.first_name, u.last_name, u.room_number, u.major, u.stay_period_start, u.stay_period_end, u.profile_picture_url, s.building_id, ur.name as role FROM ${tableName} su
      RIGHT JOIN ${userTableName} u ON u.id = su.user_id
      LEFT JOIN ${userRoleTableName} ur ON ur.id = su.role_id
      LEFT JOIN ${sectionTableName} s ON s.id = su.section_id `

	async findAllByBuildingId(buildingId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`${this.selectQueryBase} 
         WHERE s.building_id = ?`,
			[buildingId],
		)

		return rows.map((o) => o as SectionUserEntity)
	}

	async findAllBySectionId(sectionId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`${this.selectQueryBase} 
         WHERE su.section_id = ?`,
			[sectionId],
		)

		return rows.map((o) => o as SectionUserEntity)
	}

	async findBySectionIdAndUserId(sectionId: number, userId: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`${this.selectQueryBase} 
         WHERE su.user_id = ? AND su.section_id = ?`,
			[userId, sectionId],
		)

		if (rows.length === 0) return null
		return rows[0] as SectionUserEntity
	}

	async create(user: SectionUserEntity) {
		const [rows] = await db.query<RowDataPacket[]>(
			`INSERT INTO ${tableName} SET ?`,
			[user],
		)

		return rows[0] as SectionUserEntity
	}

	async update(
		sectionId: number,
		userId: number,
		user: Partial<SectionUserEntity>,
	) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${tableName} SET ? WHERE user_id = ? AND section_id = ?`,
			[user, userId, sectionId],
		)

		return result.affectedRows > 0
	}

	async delete(sectionId: number, userId: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${tableName} WHERE user_id = ? AND section_id = ?`,
			[userId, sectionId],
		)

		return result.affectedRows > 0
	}
}

export default new SectionUserRepository()
