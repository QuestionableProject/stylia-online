const sequelize = require("../db")
const {DataTypes} = require("sequelize")


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING, allowNull: true},
    role: {type: DataTypes.STRING, defaultValue: "user"},
})
const Products = sequelize.define('products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    category: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    prise: {type: DataTypes.INTEGER},
    image: {type: DataTypes.STRING, allowNull: true}
})
const Curt = sequelize.define('curt', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
Products.hasMany(Curt)
Curt.belongsTo(Products)

User.hasOne(Curt)
Curt.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)
// User.sync({ alter: true }).then(() => {"База переопределена"})
// Order.sync({ alter: true }).then(() => {"База переопределена"})
module.exports = {
    User, Products, Curt
}