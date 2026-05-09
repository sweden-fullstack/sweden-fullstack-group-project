import jwt from "jsonwebtoken"

interface TokenPayload extends jwt.JwtPayload {
	sub: string
	exp: number
}

export default TokenPayload
