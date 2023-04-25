const Router = require('express')
const router = new Router()
const usercontol = require("../controller/usercontroller")
const auth = require('../middlware/authmiddleware')
const userchange = require('../controller/userchange')

router.post('/registration', usercontol.registration)
router.post('/login', usercontol.login)
router.post('/rename',  usercontol.rename)
router.get('/auth',  auth,usercontol.auth)
router.get('/userChange',  userchange.getAll)

module.exports = router