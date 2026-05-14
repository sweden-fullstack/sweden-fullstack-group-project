/**
 * Returned object from the database for the frontend to see, doesn't include sensitive info (like user password) that the entity may include
 */
type UserDto = {
	id: number
	email: string
	firstName: string
	lastName: string
	roomNumber: number
	major: string
	stayPeriodStart: Date
	stayPeriodEnd: Date
	profilePictureUrl?: string

	// From joins
	sectionId?: number
	roleId?: number
	buildingId?: number
	role?: string
}

export default UserDto
