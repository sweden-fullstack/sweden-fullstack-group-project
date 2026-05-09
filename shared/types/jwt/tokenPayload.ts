import jwt from "jsonwebtoken"

interface TokenPayload extends jwt.JwtPayload {
	role: string
	sub: string
	exp: number
}

export default TokenPayload
