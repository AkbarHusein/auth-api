import type { Express } from 'express'
import express from 'express'
import bp from 'body-parser'
import { config } from "dotenv"
import morgan from 'morgan'

config()
const app: Express = express()
const host = process.env.APP_HOST
const port = process.env.APP_PORT

app.use(bp.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.listen(port, () => {
    console.log(`[server] Running at http://${host}:${port}`)
})