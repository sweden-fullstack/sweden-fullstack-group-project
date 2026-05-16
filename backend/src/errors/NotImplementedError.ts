import AppError from "./AppError"

export default class NotImplementedError extends AppError {
	constructor(message: string = "") {
		super(500, message)
		this.name = "NotImplemented"
	}
}
