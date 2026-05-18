import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import { Request, Response, NextFunction } from "express"
import sectionService from "@/modules/section/section.service"
import SectionUserDto from "@/shared/types/section-user/sectionUser.dto"
import ForbiddenError from "@/errors/ForbiddenError"

const canAssignToSection = () => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		const jwt = req.user as JwtPayloadExtended
		const body = req.body as SectionUserDto

		if (jwt.userRole === "admin") {
			return next()
		}

		if (jwt.userRole !== "landlord") {
			throw new ForbiddenError(
				"Only landlords and admins can modify users",
			)
		}

		if (body && body.role !== "student" && body.role !== "section_admin") {
			throw new ForbiddenError(
				"Assigned role must be student or section_admin",
			)
		}

		const sectionId = req.params.sectionId ?? body.sectionId
		const section = await sectionService.getById(
			parseInt(sectionId as string),
		)

		if (jwt.buildingId === section.buildingId) {
			return next()
		} else {
			throw new ForbiddenError(
				"Landlords can't assign students between buildings, use different jwt token if landlord has multiple buildings",
			)
		}
	}
}

export default canAssignToSection
