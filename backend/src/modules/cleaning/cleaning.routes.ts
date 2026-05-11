import { Router } from "express"
import eventTypeController from "./cleaning.controller"

const router = Router()

router.get("/", eventTypeController.getCleaningData)

export default router
