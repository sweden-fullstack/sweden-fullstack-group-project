import db from "@/config/database"
import mysql from "mysql2/promise"
import { AsyncLocalStorage } from "async_hooks"

export class Transaction {
	private static pool?: mysql.Pool
	private static asyncLocalStorage =
		new AsyncLocalStorage<mysql.PoolConnection>()

	private static initialize(pool: mysql.Pool) {
		this.pool = pool
	}

	/**
	 * Simplifies the running of database transactions and supports running of
	 * "nested" transactions by recognising that a transaction is nested and
	 * reusing the old context instead of creating new one and breaking everything
	 */
	static async run<T>(
		callback: (conn: mysql.PoolConnection) => Promise<T>,
	): Promise<T> {
		if (!this.pool) {
			this.initialize(db)
		}

		if (!this.pool) {
			throw new Error("Database pool initialization failed")
		}

		const existingConnection = this.asyncLocalStorage.getStore()
		if (existingConnection) {
			const result = await callback(existingConnection)
			return result
		} else {
			const conn = await this.pool.getConnection()
			const context = conn

			return this.asyncLocalStorage.run(context, async () => {
				try {
					await conn.beginTransaction()
					const result = await callback(conn)
					await conn.commit()
					return result
				} catch (error) {
					await conn.rollback()
					throw error
				} finally {
					conn.release()
				}
			})
		}
	}
}
