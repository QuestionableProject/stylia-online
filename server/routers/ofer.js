const Router = require('express')
const router = new Router()
const ofercontroller = require('../controller/ofercontroller')

router.post('/', ofercontroller.create)
router.post('/getofer', ofercontroller.getOfer)
router.post('/getAllOfer', ofercontroller.getAllOfer)
router.post('/updateOfer', ofercontroller.editOfer)

module.exports = router