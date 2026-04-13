/**
 * User object for creating users
 */
type UserCreate = {
	username: string
	gmail: string // This can be optional if we can create users by multiple providers
}

export default UserCreate
