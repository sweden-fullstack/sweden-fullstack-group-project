import db from "@/config/database"
import { ResultSetHeader, RowDataPacket } from "mysql2"
import SectionUserEntity from "./types/sectionUser.entity"
import {
	sectionTableName,
	sectionUserTableName,
	userRoleTableName,
	userTableName,
} from "@/utils/tableNames"

class SectionUserRepository {
	selectQueryBase = `SELECT su.*, u.email, u.first_name, u.last_name, u.room_number, u.major, u.stay_period_start, u.stay_period_end, u.profile_picture_url, s.building_id, ur.name as role FROM ${sectionUserTableName} su
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
		const [result] = await db.query<ResultSetHeader>(
			`INSERT INTO ${sectionUserTableName} SET ?`,
			[user],
		)

		if (result.affectedRows === 0) return null
		return user as SectionUserEntity
	}

	async update(
		sectionId: number,
		userId: number,
		user: Partial<SectionUserEntity>,
	) {
		const [result] = await db.query<ResultSetHeader>(
			`UPDATE ${sectionUserTableName} SET ? WHERE user_id = ? AND section_id = ?`,
			[user, userId, sectionId],
		)

		return result.affectedRows > 0
	}

	async delete(sectionId: number, userId: number) {
		const [result] = await db.query<ResultSetHeader>(
			`DELETE FROM ${sectionUserTableName} WHERE user_id = ? AND section_id = ?`,
			[userId, sectionId],
		)

		return result.affectedRows > 0
	}
}

export default new SectionUserRepository()
