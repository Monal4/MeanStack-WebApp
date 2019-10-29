var Survey      = require("../models/survey")
var Question    = require("../models/question")

// Object for Middleware
var middlewareAuth = {}

middlewareAuth.checkSurveyOwnership = function(req, res, next) {
    // Middleware for checking survey ownership

    if (req.isAuthenticated()) {
        Survey.findById(req.params.id, function(err, foundSurvey) {
        
            if (err) {
                console.log(err)
                req.flash("error", "Survey Doesn't Exist.")
                res.redirect("back")
            }
            else {
                if(foundSurvey.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next() // moves and links to update or delete 
                } else {
                    req.flash("error", "Permission Denied.")
                    res.redirect("back")
                }
                
            }
            
                    
            
            
        })
    } else {
        console.log("You need to be logged in!")
        req.flash("error", "Please Login.")
        res.redirect("back")
    }
}


middlewareAuth.checkQuestionOwnership = function(req, res, next) {
    // Middleware for checking survye ownership

    if (req.isAuthenticated()) {
        Question.findById(req.params.question_id, function(err, foundQuestion) {
        
            if (err) {
                console.log(err)
                res.redirect("back")
            }
            else {
                if(foundQuestion.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next() // moves and links to update or delete 
                } else {
                    req.flash("error", "Permission Denied.")
                    res.redirect("back")
                }
                
            }
            
                    
            
            
        })
    } else {
        console.log("You need to be logged in!")
        req.flash("error", "Please Login.")
        res.redirect("back")
    }

}

// Middleware
middlewareAuth.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash("error", "You were unable to perform the selected action. Please Login.") // this message goes to /login route with key "error"
        res.redirect("/login")
    }
}

module.exports = middlewareAuth