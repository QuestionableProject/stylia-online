const {Address} = require('../models/models')

class AddressController {
    async getAll(req,res) {
        const address = await Address.findAll()
        return res.json(address);
    }
}

module.exports = new AddressController()