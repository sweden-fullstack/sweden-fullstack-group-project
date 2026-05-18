import AppError from "./AppError"

export default class UnauthenticatedError extends AppError {
	constructor(message: string = "Unauthenticated") {
		super(401, message)
		this.name = "Unauthenticated"
	}
}
