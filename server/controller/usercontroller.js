const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken")
const { User } = require('../models/models')

const generatejwt = (id, login, nickname, image, role) => {
    return JWT.sign(
        { id, login, nickname, image, role },
        process.env.SECRET_KEY,
        { expiresIn: '365d' }
    )
}

class usercontroller {
    async registration(req, res, next) {
        const { login, password } = req.body
        if (!login || !password) return next(ApiError.badRequest("Пустой запрос"))
        const OldUser = await User.findOne({ where: { login } })
        if (OldUser) return next(ApiError.badRequest("Вы не можете использовать такой логин"))
        const HashPass = await bcrypt.hash(password, 5)
        const user = await User.create({ login, password: HashPass, nickname: "User",image: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/DefaultImage.png` })
        return res.json({message: "Пользователь зарегистрирован", register: true})
    }
    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({ where: { login } })
        if (!user) return next(ApiError.badRequest("Пользователь не найден"))
        let checkpass = bcrypt.compareSync(password, user.password)
        if (!checkpass) return next(ApiError.badRequest("Не верный пароль"))
        const token = generatejwt(user.id, user.login, user.nickname, user.image, user.role)
        return res.json({ token: token, nickname: user.nickname, image: user.image, id: user.id, role: user.role })
    }
    async auth(req, res) {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ["id", "image", "nickname", "role"]
        })
        const token = generatejwt(req.user.id, req.user.login, req.user.nickname, req.user.image, req.user.role)
        return res.json({ token: token, nickname: user.nickname, image: user.image, id: user.id, role: user.role })
    }
    async rename(req, res) {
        const { userId, newName } = req.body
        await User.update(
            {
                nickname: newName,
            },
            {
                where: {
                    id: userId,
                },
            }
        )
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        const nickname = user.nickname 
        return res.json({nickname: nickname })
    }

}

module.exports = new usercontroller()