import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import { NextFunction } from "express"
import ForbiddenError from "@/errors/ForbiddenError"
import userService from "@/modules/user/user.service"

/**
 * @param managedUserId If the userId is not managed by the landlord the auth check will fail, if undefined will try to get from req.body.id, if that fails auth fails
 * @param allowManageUserWithoutLandlord Allow managing of users without landlord if everything else is ok
 */
async function isLandlordOfUserBase(
	next: NextFunction,
	jwt: JwtPayloadExtended,
	managedUserId: number,
	allowManageUserWithoutLandlord: boolean,
) {
	if (jwt.userRole === "admin") {
		return next()
	}

	if (jwt.userRole !== "landlord") {
		throw new ForbiddenError("User not landlord")
	}

	const user = await userService.getById(managedUserId)

	if (!user.buildingId && allowManageUserWithoutLandlord) {
		return next()
	}

	if (user.buildingId === jwt.buildingId) {
		return next()
	} else if (allowManageUserWithoutLandlord) {
		throw new ForbiddenError("Can't manage users without landlord")
	} else {
		throw new ForbiddenError(
			"Can't manage users not belonging to current landlord",
		)
	}
}

export default isLandlordOfUserBase
