import AppError from "@/errors/AppError"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export default class ErrorHandler {
	static handle(
		err: unknown,
		_req: Request,
		res: Response,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_next: NextFunction,
	) {
		if (err instanceof Error) {
			console.error(err)
		}

		if (err instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ message: err.message })
		}

		if (err instanceof AppError) {
			return res.status(err.statusCode).json({ message: err.message })
		}

		return res.status(500).json({ message: "Internal Server Error" })
	}
}
