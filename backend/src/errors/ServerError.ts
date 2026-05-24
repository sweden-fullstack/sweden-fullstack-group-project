import AppError from "./AppError"

export default class ServerError extends AppError {
	constructor(message: string = "ServerError") {
		super(500, message)
		this.name = "ServerError"
	}
}
