import { Router } from "express"
import validator, { auth } from '../../middlewares'
import { login } from '../../controllers/auth'

const router = Router()

router.post('/login', auth.loginvalidator, validator, login)

export default router