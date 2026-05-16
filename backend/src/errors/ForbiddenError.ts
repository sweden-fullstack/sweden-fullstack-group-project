import AppError from "./AppError"

export default class ForbiddenError extends AppError {
	constructor(message: string = "Forbidden") {
		super(403, message)
		this.name = "Forbidden"
	}
}
