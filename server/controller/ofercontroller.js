const {Ofer, OferProduct, Products} = require('../models/models')

class OferController {
    async create(req,res) {
        const {name, email, address, phone, product, userId} = req.body
        const oferCreate = await Ofer.create({
            name: name, 
            email: email, 
            address: address, 
            phone: phone,
            userId: userId,
            active: false
        })
        product.map(async e => {
            await OferProduct.create({
                oferId: oferCreate.id, productId: e.productId
            })
        })
        return res.json({message: "Заказ оформлен!"});
    }
    async getOfer(req,res) {
        const {userId} = req.body

        const ofers = await Ofer.findAll({
            where: { userId },
            attributes: ["name", "id", "active", "address","createdAt"],
            include: [{
                model: OferProduct,
                attributes: ["productId"],
                include: [{
                    model: Products,
                    attributes: [
                        "id", "image",
                    ]
                }]
            }],

        })

        return res.json(ofers)
    }
}

module.exports = new OferController()