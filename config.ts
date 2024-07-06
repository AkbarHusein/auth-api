import { decode, sign, JwtPayload } from 'jsonwebtoken'

type SigningPayload = {
    name: string;
    email: string;
};

const createToken = (payload: SigningPayload): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret is not defined')
    }
    const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
    return token
}

const extractToken = (authorizationHeader?: string): string | null => {
    if (!authorizationHeader) return null
    const parts = authorizationHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null
    return parts[1]
}

const decodeToken = (
    authorizationHeader?: string
): (JwtPayload & { name: string; email: string }) | null => {
    const token = extractToken(authorizationHeader)
    if (!token) return null

    try {
        const decoded = decode(token) as JwtPayload & { name: string; email: string } | null
        return decoded
    } catch (error) {
        console.error('Error decoding token:', error)
        return null
    }
}

export { createToken, extractToken, decodeToken, SigningPayload }
