const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    passwd: String,
    roles: String
})

const prodcutSchema = new mongoose.Schema({
    name: String,
    variant: String,
    type: String,
    category: String,
    brand: String,
    description: String,
    image: String
})


const userModel = mongoose.model("users",userSchema);
const productModel = mongoose.model("products",prodcutSchema);

module.exports = {
    userModel: userModel,
    productModel: productModel
};