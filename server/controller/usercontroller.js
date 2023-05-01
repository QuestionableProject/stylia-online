const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken")
const { User } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require("fs");

const generatejwt = (id, login) => {
    return JWT.sign(
        { id, login },
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
        const user = await User.create({ login, password: HashPass, nickname: "User"})
        return res.json({ message: "Пользователь зарегистрирован", register: true })
    }
    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({ where: { login } })
        if (!user) return next(ApiError.badRequest("Пользователь не найден"))
        let checkpass = bcrypt.compareSync(password, user.password)
        if (!checkpass) return next(ApiError.badRequest("Не верный пароль"))
        const token = generatejwt(user.id, user.login)
        return res.json({ token: token, nickname: user.nickname, image: user.image, id: user.id, role: user.role })
    }
    async auth(req, res) {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ["id", "image", "nickname", "role"]
        })
        const token = generatejwt(req.user.id, req.user.login)
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
        return res.json({ nickname: nickname })
    }
    async reImage(req, res) {
        const { userId, userImage } = req.body
        const { image } = req.files;
        
        if (userImage === "null") {
            const fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const user = await User.findOne({
                where: { id: userId }
            })

            user.image = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${fileName}`
            await user.save();
            return res.json({ image: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${fileName}` })
        }
        fs.unlink(`../server/static/${userImage.replace([`${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`], "")}`, ()=>{})
        const fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '..', 'static', fileName))
        const user = await User.findOne({
            where: { id: userId }
        })

        user.image = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${fileName}`
        await user.save();
        return res.json({ image: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${fileName}` })
    }

}

module.exports = new usercontroller()