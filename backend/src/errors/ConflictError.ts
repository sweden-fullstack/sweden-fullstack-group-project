import AppError from "./AppError"

export default class ConflictError extends AppError {
	constructor(message: string = "Conflict") {
		super(409, message)
		this.name = "Conflict"
	}
}
