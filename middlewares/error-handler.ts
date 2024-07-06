import status from 'http-status'
import type { Request, Response, ErrorRequestHandler, NextFunction } from "express"

const errorhandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.httpStatusCode || status.INTERNAL_SERVER_ERROR
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        message,
    })

    console.error(`[Server]: [${new Date().toISOString()}] ${req.method} ${req.url} - ${message}`)
    next()
}

export default errorhandler
