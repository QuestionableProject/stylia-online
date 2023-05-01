const sequelize = require("../db")
const { DataTypes } = require("sequelize")


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: DataTypes.STRING },
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
    buyCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const ProductsDescription = sequelize.define('productsDescription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const ProductsDescriptionCharacter = sequelize.define('productsDescriptionCharacter', {
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
const CurtProduct = sequelize.define('curtProduct', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const Subscribe  = sequelize.define('subscribe', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const Address  = sequelize.define('address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    time: { type: DataTypes.STRING },
    map: { type: DataTypes.ARRAY(DataTypes.STRING) },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const ProductCategory  = sequelize.define('productcategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})

const Ofer  = sequelize.define('ofer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    active: { type: DataTypes.BOOLEAN },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
const OferProduct  = sequelize.define('oferproduct', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') },
    updatedAt: { type: DataTypes.DATE, defaultValue: sequelize.literal('NOW()') }
})
// Корзина
User.hasOne(Curt)
Curt.belongsTo(User)

Curt.hasMany(CurtProduct)
CurtProduct.belongsTo(Curt)

Products.hasOne(CurtProduct)
CurtProduct.belongsTo(Products)

// Описание
Products.hasOne(ProductsDescription)
ProductsDescription.belongsTo(Products)

ProductsDescription.hasMany(ProductsDescriptionCharacter)
ProductsDescriptionCharacter.belongsTo(ProductsDescription)

// Заказы
User.hasMany(Ofer)
Ofer.belongsTo(User)

Ofer.hasMany(OferProduct)
OferProduct.belongsTo(Ofer)

Products.hasOne(OferProduct)
OferProduct.belongsTo(Products)

module.exports = {
    User, Products, 
    ProductsDescription, ProductsDescriptionCharacter, 
    Curt, CurtProduct, 
    Subscribe, Address, 
    ProductCategory ,
    Ofer, OferProduct
}