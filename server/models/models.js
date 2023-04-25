const sequelize = require("../db")
const { DataTypes } = require("sequelize")


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    login: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, defaultValue: "user" },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const Products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    prise: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const CharacterChair = sequelize.define('productsdescription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    character: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const Curt = sequelize.define('curt', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
Products.hasMany(Curt)
Curt.belongsTo(Products)

User.hasOne(Curt)
Curt.belongsTo(User)

// Products.hasOne(ProductCharacter)
// ProductCharacter.hasOne(Products)

// ProductsDescriptions.sync({ alter: true }).then(() => {"База переопределена"})
module.exports = {
    User, Products, Curt
}