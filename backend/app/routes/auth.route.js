var accountController = require('../controllers/account.controller')
let router = require('express').Router()
const verifyToken = require('../middlewares/auth')

router.post('/login', accountController.login)
router.get('/verify', verifyToken, accountController.verify)
router.get('/logout', accountController.logout)

module.exports = router;