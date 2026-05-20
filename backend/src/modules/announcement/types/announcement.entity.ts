/**
 * Object as it is stored in the database, NOT TO BE RETURNED AS IS SINCE IT MAY CONTAIN SENSITIVE INFO!
 * @see AnnouncementDto
 */
type AnnouncementEntity = {
	id: number
	building_id: number
	title: string
	meta: string
	body: string
}

export default AnnouncementEntity
