import envConfig from "@/config/env"
import axios from "axios"
import type { CleaningStateDto } from "@/features/cleaning/types"

export type SaveCleaningStatePayload = {
	sectionId: number
	dutyTemplate: string[]
	daysWithoutCleaning: string[]
	schedule: Record<string, { name: string; assigneeId: number | null }[]>
}

const CLEANING_PATH = `${envConfig.backend}cleaning/`

export async function getCleaningState() {
	const { data } = await axios.get<CleaningStateDto>(CLEANING_PATH)
	return data
}

export async function saveCleaningState(payload: SaveCleaningStatePayload) {
	await axios.put(CLEANING_PATH, payload)
}
