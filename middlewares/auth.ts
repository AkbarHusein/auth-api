import { body } from "express-validator"

const loginvalidator = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .notEmpty()
        .withMessage('Please provide a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Please provide password')
]

export { loginvalidator }