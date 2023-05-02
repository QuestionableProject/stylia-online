const {Ofer, OferProduct, Products, Curt, CurtProduct} = require('../models/models')

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
        const curtCheck = await Curt.findOne({
            where: { userId },
        })
        await CurtProduct.destroy({
            where: { curtId: curtCheck.id },
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

    async getAllOfer(req,res) {
        const ofers = await Ofer.findAll({
            include: [{
                model: OferProduct,
                attributes: ["productId"],
                include: [{
                    model: Products,
                }]
            }],
        })

        return res.json(ofers)
    }
    async editOfer(req,res) {
        const {oferId, active} = req.body
        const ofers = await Ofer.findOne({
            where: {id: oferId}
        })
        ofers.active = active
        await ofers.save();

        const ofersGet = await Ofer.findAll({
            include: [{
                model: OferProduct,
                attributes: ["productId"],
                include: [{
                    model: Products,
                }]
            }],
        })

        return res.json(ofersGet)
    }
}

module.exports = new OferController()