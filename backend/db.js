const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/paytm");

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30},
    password:{ 
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024},
    firstname : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50},

})

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
})
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("account", accountSchema);
module.exports = {
    User,Account
};