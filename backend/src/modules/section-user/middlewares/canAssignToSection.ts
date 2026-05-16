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
			throw new ForbiddenError()
		}

		if (body.role !== "student" && body.role !== "section_admin") {
			throw new ForbiddenError()
		}

		const sectionId = body.sectionId
		const section = await sectionService.getById(sectionId)

		if (jwt.buildingId === section.buildingId) {
			return next()
		} else {
			throw new ForbiddenError()
		}
	}
}

export default canAssignToSection
