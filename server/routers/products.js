const Router = require('express')
const router = new Router()
const productcontroller = require('../controller/productcontroller')


router.post('/', productcontroller.create)
router.get('/',productcontroller.getAll)
router.get('/:id', productcontroller.getOne)
router.get('/category', productcontroller.getCategory)
router.post('/removeProd', productcontroller.removeProduct)

module.exports = router