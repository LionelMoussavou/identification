const { Router } = require('express')

const { connexion, inscription } = require('../Controllers/ctlr')

const router = Router()

router.post('/inscription', inscription)
router.post('/connexion', connexion)


router.get('/', (req, res) => {
    res.send('Route protégé')

})

module.exports = router