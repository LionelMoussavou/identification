const joi = require('joi')

function userValidation(body) {
    const userValidationSigup = joi.object({
        firstName: joi.string().min(2).max(30).trim().required(),
        lastName: joi.string().min(2).max(30).trim().required(),
        email: joi.string().email().trim().required(),
        password: joi.string().min(8).max(30).required()
    })

    const userValidationLogin = joi.object({
        email: joi.string().email().trim().required(),
        password: joi.string().min(8).max(30).required()

    })

    return {
        userValidationSigup: userValidationSigup.validate(body),
        userValidationLogin: userValidationLogin.validate(body)
    }
}

module.exports = userValidation