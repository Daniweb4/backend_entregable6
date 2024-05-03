const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const Purchase = require("./Purchase");
const Productimg = require("./Productimg");
;

//Esto es para enlazar Idcategoria al product

Product.belongsTo(Category)
Category.hasMany(Product)

Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase -> UserId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase -> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//ProductImg -> productId
Productimg.belongsTo(Product)
Product.hasMany(Productimg)