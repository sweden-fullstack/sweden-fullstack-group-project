import db from "@/config/database"
import mysql from "mysql2/promise"

const depthMap = new WeakMap<mysql.PoolConnection, number>()

export class Transaction {
	private static pool?: mysql.Pool

	private static initialize(pool: mysql.Pool) {
		this.pool = pool
	}

	private static getDepth(conn: mysql.PoolConnection): number {
		return depthMap.get(conn) ?? 0
	}

	private static setDepth(conn: mysql.PoolConnection, depth: number) {
		if (depth === 0) {
			depthMap.delete(conn)
		} else {
			depthMap.set(conn, depth)
		}
	}

	/**
	 * Runs queries as a database transaction
	 * If nested transaction is detected it will
	 * not run the occurances after the first
	 */
	static async run<T>(
		callback: (conn: mysql.PoolConnection) => Promise<T>,
	): Promise<T> {
		if (!this.pool) {
			Transaction.initialize(db)
		}

		if (!this.pool) {
			throw new Error("Initialization failed?")
		}

		const conn = await this.pool.getConnection()
		const depth = this.getDepth(conn)
		const isOuter = depth === 0

		try {
			this.setDepth(conn, depth + 1)

			if (isOuter) {
				await conn.beginTransaction()
			}

			const result = await callback(conn)

			if (isOuter) {
				await conn.commit()
			}

			return result
		} catch (error) {
			if (isOuter) {
				await conn.rollback()
			}
			throw error
		} finally {
			const newDepth = depth - 1

			this.setDepth(conn, newDepth)
			if (newDepth === 0) {
				conn.release()
			}
		}
	}
}
