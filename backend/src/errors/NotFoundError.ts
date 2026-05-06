import AppError from "./AppError"

export default class NotFoundError extends AppError {
	constructor(message: string) {
		super(404, message)
		this.name = "NotFound"
	}
}
