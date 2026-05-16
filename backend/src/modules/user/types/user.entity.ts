/**
 * Object as it is stored in the database, NOT TO BE RETURNED AS IS SINCE IT MAY CONTAIN SENSITIVE INFO!
 * @see UserDto
 */
type UserEntity = {
	id: number
	email: string
	first_name: string
	last_name: string
	room_number: number
	major: string
	stay_period_start: Date
	stay_period_end: Date
	profile_picture_url?: string
}

export default UserEntity
