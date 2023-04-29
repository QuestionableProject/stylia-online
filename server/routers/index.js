const Router = require('express')
const router = new Router()

const user = require("./user")
const products = require("./products")
const curt = require("./curt")
const ofer = require("./ofer")

const category = require('../controller/category')
const address = require('../controller/addresscontroller')
const subscribe = require('../controller/subscribecontroller')

router.use('/user', user)
router.use('/products', products)
router.use('/curt', curt)
router.use('/ofer', ofer)
router.use('/subscribe', subscribe.create)
router.use('/address', address.getAll)
router.use('/category', category.getCategory)


module.exports = router