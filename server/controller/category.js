const {ProductCategory} = require('../models/models')

class CategoryController {
    async getCategory(req,res) {
        const categorys = await ProductCategory.findAll()
        return res.json(categorys)
    }
}

module.exports = new CategoryController()