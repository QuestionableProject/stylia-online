const {Subscribe} = require('../models/models')

class SubscribeController {
    async create(req,res) {
        const {email} = req.body

        const subscribeCheck = await Subscribe.findOne({where: {email}})

        if (subscribeCheck) return res.json({message: "Вы уже подписаны"});

        await Subscribe.create({email}) 

        return res.json({message: "Вы подписались на рассылку"});
    }
}

module.exports = new SubscribeController()