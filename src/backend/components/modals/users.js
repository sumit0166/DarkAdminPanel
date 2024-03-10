const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    passwd: String,
    roles: String
})



const userModel = mongoose.model("users",userSchema);


module.exports = {
    userModel,
};