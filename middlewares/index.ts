import * as auth from './auth'

import type { Response, Request, NextFunction } from 'express'
import status from 'http-status'
import { validationResult } from 'express-validator'

const validator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(status.BAD_REQUEST).json({ errors: errors.array() })
    }
    next()
}

export { auth }

export default validator