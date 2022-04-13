const joi = require('joi')

function userValidation(body) {
    const userValidationShema = joi.object({
        firstName: joi.string().min(2).max(30).trim().required(),
        lastName: joi.string().min(2).max(30).trim().required(),
        email: joi.string().email().trim().required(),
        password: joi.string().min(8).max(30).required()
    })

    return userValidationShema.validate(body)
}

module.exports = userValidation