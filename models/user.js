/*
Author: Avinash Reddy
Edited:Yuxuan He
Date: 07/05/2018
*/

// Schema that create and store admin user data.
var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
        unique: true
    },
    password: String, 
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// all methods or functionalities will be provided to user model to get the security
userSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model("User", userSchema)