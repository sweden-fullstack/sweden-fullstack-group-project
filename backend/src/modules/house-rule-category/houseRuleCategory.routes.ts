import { Router } from "express"
import houseRuleCategoryController from "./houseRuleCategory.controller"
import authHandler from "@/middlewares/authHandler"

const router = Router()

router.get("/", authHandler(), houseRuleCategoryController.getAllCategories)

export default router
