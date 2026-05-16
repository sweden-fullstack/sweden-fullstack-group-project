import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import { Request, Response, NextFunction } from "express"
import UserDto from "@/shared/types/user/user.dto"
import AppError from "@/errors/AppError"
import isLandlordOfUserBase from "@/middlewares/isLandlordOfUserBase"

/**
 * @param managedUserId If the userId is not managed by the landlord the auth check will fail, if undefined will try to get from req.body.id, if that fails auth fails
 * @param allowManageUserWithoutLandlord Allow managing of users without landlord if everything else is ok
 */
const isLandlordOfUser = (
	managedUserId?: number,
	allowManageUserWithoutLandlord: boolean = true,
) => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		const jwt = req.user as JwtPayloadExtended
		const userId =
			managedUserId ?? req.params.id ?? (req.body as UserDto).id

		if (!userId) {
			throw new AppError(500, "User id not defined")
		}

		return isLandlordOfUserBase(
			next,
			jwt,
			parseInt(userId as string),
			allowManageUserWithoutLandlord,
		)
	}
}

export default isLandlordOfUser
