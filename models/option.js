/*
Author: Avinash Reddy
Edited:Yuxuan He
Date: 07/05/2018
*/

//Schema to store the options of question provide by survey.
var mongoose = require("mongoose")

var questionSchema = mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    content:String,
    skipId: String
})

module.exports = mongoose.model("Option", questionSchema) 