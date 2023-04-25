const {Products, ProductsDescriptions} = require('../models/models')
class Productcontroller {
    async create(req,res) {

    }
    async getAll(req,res) {
        const CheckProduct = await Products.findAll()
        return res.json(CheckProduct)
    }
    async getOne(req,res) {
        const {id} = req.params
        const product = await Products.findOne({
            where: {id},
            attributes: [
                "id",
                "description",
                "name",
                "image",
                "prise",
                "category",
            ],
            // include: [{
            //     model: ProductCharacter,
            // }]
        })
        return res.json(product)
    }
}

module.exports = new Productcontroller()