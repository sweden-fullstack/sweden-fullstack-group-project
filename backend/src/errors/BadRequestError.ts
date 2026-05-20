import AppError from "./AppError"

export default class BadRequestError extends AppError {
	constructor(message: string = "Bad Request") {
		super(400, message)
		this.name = "BadRequest"
	}
}
