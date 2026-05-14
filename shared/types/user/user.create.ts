/**
 * User object for creating users
 */
type UserCreate = {
	id: number
	email: string
	firstName: string
	lastName: string
	roomNumber: number
	major: string
	stayPeriodStart: Date
	stayPeriodEnd: Date
	profilePictureUrl?: string
}

export default UserCreate
