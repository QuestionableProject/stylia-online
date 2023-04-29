const {Products, ProductsDescription, ProductsDescriptionCharacter, ProductCategory} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class Productcontroller {
    async create(req,res) {
        const {name, category, description, prise} = req.body;
        const {image} = req.files;
        const fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '..', 'static', fileName))
        await Products.create({
            name, category, description, prise, image: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${fileName}`
        })
        return res.json({message: "Товар создан"})
    }
    async getCategory(req,res) {
        const categorys = await ProductCategory.findAll()
        return res.json(categorys)
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
            include: [{
                model: ProductsDescription,
                attributes: [
                    "productId"
                ],
                include: [{
                    model: ProductsDescriptionCharacter,
                    attributes: [
                        "name", "character"
                    ]
                }]
            }],
        })
        return res.json(product)
    }
    async removeProduct(req,res) {
        const {productId} = req.body
        
        await Products.destroy({
            where: {id: productId}
        })
        return res.json({message: "Товар удален"})
    }
}

module.exports = new Productcontroller()