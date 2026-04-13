/**
 * Returned object from the database for the frontend to see, doesn't include sensitive info (like user password) that the entity may include
 */
type UserDto = {
	username: string
	gmail: string
}

export default UserDto
