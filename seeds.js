var mongoose    = require("mongoose"),
    Survey      = require("./models/survey"),
    Question    = require("./models/question")

var data = [
    {
        name: "Survey of Cloud's Rest", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Survey of Desert Mesa", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Survey of Canyon Floor", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
    
    
function seedDB() {
    // REMOVE - Surveys
    Survey.remove({}, function(err) {
        // if (err) {
        //     console.log(err)
        // }
        // console.log("Removed all surveys successfully.")
        // // ADD - Surveys
        // data.forEach(function(seed){
        //     Survey.create(seed, function(err, survey){
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log("added a survey");
                    
        //             // ADD - Question
        //             Question.create({
        //                 text: "This is a Question 1",
        //                 author: "Avinash"
        //             }, function(err, question) {
        //                 if (err) {
        //                     console.log(err)
        //                 } else {
        //                     survey.questions.push(question)
        //                     survey.save()
        //                     console.log("Created new question")
        //                 }
                        
        //             })
        //         }
                
        //     })
                
        // })
    })
    
    
    
    // ADD - Questions
}

module.exports = seedDB


 
