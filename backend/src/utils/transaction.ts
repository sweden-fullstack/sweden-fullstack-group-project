import db from "@/config/database"
import mysql from "mysql2/promise"
import { AsyncLocalStorage } from "async_hooks"

export class Transaction {
	private static connection?: mysql.Connection
	private static asyncLocalStorage = new AsyncLocalStorage<mysql.Connection>()

	private static initialize(connection: mysql.Connection) {
		this.connection = connection
	}

	/**
	 * Simplifies the running of database transactions and supports running of
	 * "nested" transactions by recognising that a transaction is nested and
	 * reusing the old context instead of creating new one and breaking everything
	 */
	static async run<T>(
		callback: (conn: mysql.Connection) => Promise<T>,
	): Promise<T> {
		if (!this.connection) {
			this.initialize(db)
		}

		if (!this.connection) {
			throw new Error("Database pool initialization failed")
		}

		const existingConnection = this.asyncLocalStorage.getStore()
		if (existingConnection) {
			const result = await callback(existingConnection)
			return result
		} else {
			return await this.asyncLocalStorage.run(
				this.connection!,
				async () => {
					try {
						await this.connection!.beginTransaction()
						const result = await callback(this.connection!)
						await this.connection!.commit()
						return result
					} catch (error) {
						await this.connection!.rollback()
						throw error
					}
				},
			)
		}
	}
}
