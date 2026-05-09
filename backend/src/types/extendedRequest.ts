import TokenPayload from "@/shared/types/jwt/tokenPayload"

interface ExtendedRequest extends Request {
	user?: TokenPayload
}

export default ExtendedRequest
