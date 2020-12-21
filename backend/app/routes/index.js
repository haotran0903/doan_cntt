let router = require('express').Router()
const bomonRoute = require('./bomon.route')
const monhocRoute = require('./monhoc.route')
const authRoute = require('./auth.route')
const verifyToken = require('../middlewares/auth')

/* Bo mon */
router.use('/bomon', verifyToken, bomonRoute)

/* Mon hoc */
router.use('/monhoc', verifyToken, monhocRoute)

/* Auth */
router.use('/auth', authRoute)


module.exports = router;