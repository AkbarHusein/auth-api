import type { Response, Request, NextFunction } from 'express'
import { compareSync } from 'bcryptjs'
import pc from '../../utils/prisma-client'
import { createToken } from '../../config'
import { OK, UNAUTHORIZED } from 'http-status'

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const user = await pc.user.findUnique({ where: { email }})

        if (!user) {
            return res.status(UNAUTHORIZED).json({ message: 'Invalid credentials' })
        }

        const isMatch = compareSync(password, user.password)

        if (isMatch) {
            const token = createToken({ name: user.name, email: user.email })
            return res.status(OK).json({ token })
        }

        return res.status(UNAUTHORIZED).json({ message: 'Invalid credentials' })
    } catch (error) {
        next(error)
    }
}

export default login