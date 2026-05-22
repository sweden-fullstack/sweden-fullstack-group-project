import { Request, Response } from "express"
import houseRuleCategoryService from "@/modules/house-rule-category/houseRuleCategory.service"

class HouseRuleCategoryController {
	async getAllCategories(_req: Request, res: Response) {
		const categories = await houseRuleCategoryService.getAllCategories()
		res.status(200).json(categories)
	}
}
export default new HouseRuleCategoryController()
