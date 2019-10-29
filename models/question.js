/*
Author: Avinash Reddy
Edited:Yuxuan He
Date: 07/05/2018
*/

// Schema that create and store the questions from survey.
var mongoose = require("mongoose")

var questionSchema = mongoose.Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    instruction: String,
    image: String,
    groupQuestion: String,
    cognitive: String,
    qtopic: String,
    qtopicother: String,
    qNumber: {
        type: String,
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        firstName: String
    },
    types:{
        type:Number,
        default:1
    },
    silderMax:{
        type:String,
        default:0
    },
    silderMin:{
       type:String,
       default:100
    },
    options:[{
        OId:{
          type: mongoose.Schema.Types.ObjectId  
        },
        content: {
            type: String
        }, 
        skipId: String
    }],
    //sub question info
    SubQtext: String,
    SubOptions:[{
        OId:{

          type: mongoose.Schema.Types.ObjectId  
        },
        content: {
            type: String
        }
    }],
	// New Array of Skip pattern
    skipPattern:[{
        trickOption: {
            type: Number
        },
        currentQuestion:{
            type: Number
        },
        nextQuestion:{
            type: Number
        }
    }]
})

module.exports = mongoose.model("Question", questionSchema)