type SectionEntity = {
	id: number
	building_id: number
	name: string
	description?: string

	// From joins
	building_name?: string
}

export default SectionEntity
