import db from "@/config/database"
import { RowDataPacket } from "mysql2"
import { UserRoleEntity } from "./types/userRole.entity"
import { userRoleTableName } from "@/utils/tableNames"

class UserRoleRepository {
	async findAll() {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${userRoleTableName}`,
		)
		return rows.map((o) => o as unknown as UserRoleEntity)
	}

	async findById(id: number) {
		const [rows] = await db.query<RowDataPacket[]>(
			`SELECT * FROM ${userRoleTableName}
         WHERE id = ?`,
			[id],
		)

		if (rows.length === 0) return null
		return rows[0] as unknown as UserRoleEntity
	}
}

export default new UserRoleRepository()
