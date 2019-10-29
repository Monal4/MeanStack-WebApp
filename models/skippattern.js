/*
Author: Avinash Reddy,Yuxuan He
Date: 15/07/2018
*/

//Schema to store the options of question provide by survey.
var mongoose = require("mongoose")

var SkipPatternSchema = mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    currentQID:{
        type:Number
    },
    nextQID:{
        type:Number
    },
    trickOption:{
       type:Number 
    }
})

module.exports = mongoose.model("SkipPattern", SkipPatternSchema) 