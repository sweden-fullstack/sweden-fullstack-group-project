import { NextFunction } from "express"

export default class ErrorHandlerFallback {
	static handle(err: Error, req: Request, res: Response, next: NextFunction) {
		return res.status(500).json({ message: "Internal Server Error" })
	}
}
