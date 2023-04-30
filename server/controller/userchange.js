const { User } = require("../models/models")

class UserChangeController {
    async remove(req, res) {
        const { userId } = req.body
        await User.destroy({
            where: { id: userId }
        })
        const UserGet = await User.findAll({
            attributes: [
                "login",
                "role",
                "id"
            ],
        })
        return res.json(UserGet)
    }
    async getAll(req, res) {
        const UserGet = await User.findAll({
            attributes: [
                "login",
                "role",
                "id"
            ],
        })
        return res.json(UserGet)
    }

    async userRoleChange(req, res) {
        const { userId, role } = req.body
        const user = await User.findOne({
            where: {id: userId}
        })
        user.role = role;
        await user.save();

        const UserGet = await User.findAll({
            attributes: [
                "login",
                "role",
                "id"
            ],
        })
        return res.json(UserGet)
    }
}

module.exports = new UserChangeController()