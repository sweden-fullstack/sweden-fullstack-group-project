import { Router } from "express"
import cleaningController from "./cleaning.controller"

const router = Router()

router.get("/", cleaningController.getState)
router.put("/", cleaningController.saveState)

export default router
