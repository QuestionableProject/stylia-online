const { Curt, Order, OrderProduct, CurtProduct, Products } = require('../models/models')
class Informationcontroller {
    async create(req, res) {
        const { productId, userId } = req.body
        const curtCheck = await Curt.findOne({
            where: { userId },
        })

        if (!curtCheck) {
            await Curt.create({ userId })
            const curt = await Curt.findOne({
                where: { userId },
            })

            const curtEnable = await Curt.findOne({
                where: { userId },
                include: [{
                    model: CurtProduct,
                    where: { curtId: curt.id, productId }
                }]
            })
            if (curtEnable) return res.json({ message: 'Товар есть в корзине' })
            await CurtProduct.create({
                curtId: curt.id, productId
            })
            return res.json({ message: 'Товар добавлен в корзину' })
        }

        const curtEnable = await Curt.findOne({
            where: { userId },
            include: [{
                model: CurtProduct,
                where: { curtId: curtCheck.id, productId }
            }]
        })
        if (curtEnable) return res.json({ message: 'Товар есть в корзине' })
        await CurtProduct.create({
            curtId: curtCheck.id, productId
        })
        return res.json({ message: 'Товар добавлен в корзину' })
    }
    async getAll(req, res) {
        const { userId } = req.body
        const curt = await Curt.findOne({
            where: { userId },
            attributes: ["id"],
            include: [{
                model: CurtProduct,
                attributes: ["productId"],
                include: [{
                    model: Products,
                    attributes: [
                        "id", "image", "name", "prise"
                    ]
                }]
            }],

        })

        return res.json(curt)
    }
    async deleteProd(req, res) {
        const { productId, userId } = req.body
        const curtCheck = await Curt.findOne({
            where: { userId },
        })
        await CurtProduct.destroy({
            where: { curtId: curtCheck.id, productId },
        })
        const curt = await Curt.findOne({
            where: { userId },
            attributes: ["id"],
            include: [{
                model: CurtProduct,
                attributes: ["productId"],
                include: [{
                    model: Products,
                    attributes: [
                        "id", "image", "name", "prise"
                    ]
                }]
            }],

        })
        return res.json(curt)
    }
}

module.exports = new Informationcontroller()