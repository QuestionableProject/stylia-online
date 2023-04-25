const { User } = require("../models/models")

class UserChangeController {

    async getAll(req,res) {
        const UserGet = await User.findAll({
            attributes: [
                "login",
                "role"
            ],
        })
        return res.json(UserGet)
    }

    async update(req,res) {
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
        // return res.json(product)
    }
}

module.exports = new UserChangeController()