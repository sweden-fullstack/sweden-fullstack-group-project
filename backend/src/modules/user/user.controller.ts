import { Request, Response } from "express"
import userService from "./user.service"
import UserUpdate from "@/shared/types/user/user.update"
import typia from "typia"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import ForbiddenError from "@/errors/ForbiddenError"

class UserController {
	async getAll(_req: Request, res: Response) {
		const users = await userService.getAll()
		res.json(users)
	}

	async update(req: Request, res: Response) {
		const jwt = req.user as JwtPayloadExtended
		const id = parseInt(req.params.id as string)
		const body = typia.assertEquals<UserUpdate>(req.body)

		if (jwt.userId !== id && jwt.userRole !== "admin") {
			throw new ForbiddenError()
		}

		const newUser = await userService.update(id, body)
		return res.status(200).json(newUser)
	}
}

export default new UserController()
