var bomonController = require('../controllers/bomon.controller')
let router = require('express').Router()

//Lay thong tin tat ca bo mon
router.get('/', bomonController.read)

//Chinh sua 1 bo mon
router.put('/:mabomon', bomonController.update)

module.exports = router;