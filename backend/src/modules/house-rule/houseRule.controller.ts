import { Request, Response } from "express"
import typia from "typia"
import houseRuleService from "./houseRule.service"
import JwtPayloadExtended from "@/shared/types/jwt/jwtPayloadExtended"
import HouseRuleCreate from "@/shared/types/house-rule/houseRule.create"
import HouseRuleUpdate from "@/shared/types/house-rule/houseRule.update"
import ForbiddenError from "@/errors/ForbiddenError"

class HouseRuleController {
	async getAllByBuildingId(req: Request, res: Response) {
		const user = req.user as JwtPayloadExtended

		const dtos = await houseRuleService.getAllByBuildingId(user.buildingId)
		res.json(dtos)
	}

	async create(req: Request, res: Response) {
		const user = req.user as JwtPayloadExtended
		const body = typia.assertEquals<HouseRuleCreate>(req.body)
		const newDto = await houseRuleService.create(body)

		if (
			user.userRole !== "admin" &&
			user.userRole !== "landlord" &&
			user.buildingId !== body.buildingId
		) {
			throw new ForbiddenError("Missing priviliges")
		}

		res.status(201).json(newDto)
	}

	async update(req: Request, res: Response) {
		const user = req.user as JwtPayloadExtended
		const id = parseInt(req.params.id as string)
		const body = typia.assertEquals<HouseRuleUpdate>(req.body)

		if (
			user.userRole !== "admin" &&
			user.userRole !== "landlord" &&
			user.buildingId !== id
		) {
			throw new ForbiddenError("Missing priviliges")
		}

		const newDto = await houseRuleService.update(id, body)
		return res.status(200).json(newDto)
	}

	async delete(req: Request, res: Response) {
		const user = req.user as JwtPayloadExtended
		const id = parseInt(req.params.id as string)

		if (
			user.userRole !== "admin" &&
			user.userRole !== "landlord" &&
			user.buildingId !== id
		) {
			throw new ForbiddenError("Missing priviliges")
		}

		await houseRuleService.delete(id)
		return res.status(204).send()
	}
}

export default new HouseRuleController()
