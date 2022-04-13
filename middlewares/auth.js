const passport = require('passport')
const { Strategy: JsonWebTokenStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../model/model')


passport.use(
    new JsonWebTokenStrategy(
        {
            secretOrKey: "MY_SECRET",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async function (payload, next) {
            try {
                const user = await User.findById(payload.id)
                next(null, user)
            } catch (error) {
                next(error)
            }
        },
    ),
)