const Router = require('express')
const router = new Router()
const user = require("./user")
const products = require("./products")
const curt = require("./curt")

router.use('/user', user)
router.use('/products', products)
router.use('/curt', curt)

module.exports = router