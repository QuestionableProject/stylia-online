const Router = require('express')
const router = new Router()
const usercontol = require("../controller/usercontroller")
const auth = require('../middlware/authmiddleware')
const userchange = require('../controller/userchange')

router.post('/registration', usercontol.registration)
router.post('/login', usercontol.login)
router.post('/rename',  usercontol.rename)
router.post('/reimage',  usercontol.reImage)
router.get('/auth',  auth,usercontol.auth)
router.post('/userChange',  userchange.getAll)
router.post('/userRemove',  userchange.remove)
router.post('/userRoleChange',  userchange.userRoleChange)

module.exports = router