var express = require("express")
var router  = express.Router()
var Survey  = require("../models/survey")
var Answer = require("../models/answer")
var Question = require("../models/question")
var middleware = require("../middleware/index") // "../middleware" is fine coz of index.js has a special value for node 
var platform = require('platform')

//express session here and in main app
var session = require("express-session");


// Display - Route for Surveys
router.get("/", middleware.isLoggedIn,function(req, res) {
    
    var noMatch = null;
    // To display the Survey searched by the user
    console.log();
    if (req.query.search) {
        // Get all survey from search string
        const regex = new RegExp(escapeRegex(req.query.search), 'gi'); // g - global, i - ignore case
        Survey.find({name: regex}, function(error, allSurveys) {
            if (error) {
                console.log(error)
            } else {
                
                 if(allSurveys.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";     
              }
                res.render("surveys/index", {surveys: allSurveys, noMatch: noMatch})
            }
        })
    } else {
        // Get all surveys from database
        Survey.find({}, function(error, allSurveys) {
            if (error) {
                console.log(error)
            } else {
                res.render("surveys/index", {surveys: allSurveys})
            }
        })
    }
})





// Create - Route for Creating Surveys
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name
    var description = req.body.description
    var startdate = req.body.startdate
    var enddate = req.body.enddate
    var author = {
        id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName
    }
    
    var topic = req.body.topic
    
    // Check to ensure if the survey added to featured surveys
    let featuredSurveys;
    if (req.body.featuredSurveys) {
        featuredSurveys = true
    } else {
        featuredSurveys = false
    }
    
    // Check to ensure if the survey added as a public survey
    let publicSurvey;
    if (req.body.publicSurvey) {
        publicSurvey = true
    } else {
        publicSurvey = false
    }
    
    // Check to ensure if the respondents should see UI elements or not
    let hideRespondentsNav;
    if (req.body.hideRespondentsNav) {
        hideRespondentsNav = true
    } else {
        hideRespondentsNav = false
    }
    
    
    
    var newSurvey = {name: name, description: description, startdate, enddate, author: author, topic: topic, featuredSurveys: featuredSurveys, publicSurvey: publicSurvey, hideRespondentsNav: hideRespondentsNav}
    
    
    
    // newSurvey.author.id = req.user._id
    // newSurvey.author.username = req.user.username
    // newSurvey.author.firstName = req.user.firstName
    
    
    
    // Create a new survey and save
    Survey.create(newSurvey, function(error, newSurveyCreated) {
        if (error) {
            console.log(error)
        } else {
            // redirecting to surveys
            console.log(newSurveyCreated)
            res.render("surveys/createSurvey",{survey:newSurveyCreated})
        }
    })
    
})

// Survey Form - Route for Survey form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("surveys/new")
})



/*
Creating a new display page called MySurvey for surveys to provide all survey functions to be accessed just 
a click away.
Edited by Azam Khan at 09/15/2019 
*/
router.get("/mySurveys",middleware.isLoggedIn,function(req,res){
    Survey.find({},function(error,allSurveys){
        if(error){}
        else{res.render("surveys/mySurveys",{surveys:allSurveys})}
    })
})

//Create Survey - Route to create survey 
router.get("/create",middleware.isLoggedIn,function(req,res){})




// Survey Form - Route for Survey report
router.get("/report", middleware.isLoggedIn, function(req, res) {
    Survey.find({}, function(error, allSurveys) {
        if (error) {
            console.log(error)
        } else {
            res.render("surveys/report", {surveys: allSurveys})
        }
    })
})



// Show Survey - Route for displaying an individual Survey
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    Survey.findById(req.params.id).populate("questions").exec( function(error, foundSurvey) {
        if (error) {
            console.log(error)
        } else {
            res.render("surveys/show", {survey: foundSurvey, routeParam: req.params})
        }
    })
    
})


// Survey Form - Route for details of individual survey & line chart
// Edited:Karthik Parsad
// Date:09/05/2018
router.get("/report/:id", middleware.isLoggedIn, function(req, res) {
    Survey.findById(req.params.id).populate("questions").exec( function(error, foundSurvey) {
        if (error) {
            console.log(error)
        } else {
            res.render("surveys/more_details", {survey: foundSurvey, routeParam: req.params})
        }
    })
});

// EDIT - Survey Edit Route
router.get("/:id/edit", middleware.checkSurveyOwnership, function(req, res) {

    Survey.findById(req.params.id).populate("questions").exec( function(err, foundSurvey) {
        res.render("surveys/edit", {survey: foundSurvey})
    })
})





// UPDATE - Survey Update Route
router.put("/:id", middleware.checkSurveyOwnership, function(req, res) {
    
    var name = req.body.name
    var description = req.body.description
    var startdate = req.body.startdate
    var enddate = req.body.enddate
    var author = {
        id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName
    }
    
    var topic = req.body.topic
    
    // Check to ensure if the survey added to featured surveys
    let featuredSurveys;
    if (req.body.featuredSurveys) {
        featuredSurveys = true
    } else {
        featuredSurveys = false
    }
    
    // Check to ensure if the survey added as a public survey
    let publicSurvey;
    if (req.body.publicSurvey) {
        publicSurvey = true
    } else {
        publicSurvey = false
    }
    
    // Check to ensure if the respondents should see UI elements or not
    let hideRespondentsNav;
    if (req.body.hideRespondentsNav) {
        hideRespondentsNav = true
    } else {
        hideRespondentsNav = false
    }
    
    var editedSurvey = {name: name, description: description, startdate, enddate, author: author, topic: topic, featuredSurveys: featuredSurveys, publicSurvey: publicSurvey, hideRespondentsNav: hideRespondentsNav}
    
    console.log("before:")
    console.log(editedSurvey)
    
    
    // find and update survey
    Survey.findByIdAndUpdate(req.params.id, editedSurvey, function(err, updatedSurvey){
        if(err) {
            
            res.redirect("/surveys");
        } else {
            res.redirect("/surveys/" + req.params.id); // we can use updatedSurvey._id
        }
    })
})

// DELETE - Survye Delete Route
router.delete("/:id", middleware.checkSurveyOwnership, function(req, res) {
    Survey.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/surveys")
        } else {
            res.redirect("/surveys")
        }
    })
})


// Respondent Survey Display - Route for displaying an individual Survey
router.get("/response/:id", function(req, res) {
    // start timer
    var startTime = 0
    var endTime = 0
    startTime = new Date()
    Survey.findById(req.params.id).populate("questions").exec( function(error, foundSurvey) {
        endTime = new Date()
        var timeDiff = (((endTime - startTime) / 1000))
        if (error) {
            console.log(error)
        } else {
            console.log(foundSurvey)
            // end timer
            console.log(timeDiff)
            var platformDetails = {platformName: platform.name, platformOS: platform.os, platformProduct: platform.product, platformManufacturer: platform.manufacturer, packetLoadTime: timeDiff}
            res.render("respondents/respondent_answer", {survey: foundSurvey, platformDetails: platformDetails})
        }
    })
})


/*
    Respondent Survey - ADD answers to answer model
    Edited by Yuxuan He at 05/22/2018
*/
router.post("/response/:id", function(req, res) {
    /*Create new Answer */
    Survey.findById(req.params.id, function(err, survey) {
    if (err) {
            console.log(err)
            res.redirect("/")
        } else {
            console.log("DEBUG: displaying req data")
            console.log(req.body.answer)
            let answers = req.body.answer;
            Answer.create(req.body.answer,function(err,answer){
                if (err) {
                    req.flash("error", "The Answer is not Successful.")
                    console.log(err)
                } else {
                    //save answers into answer table
                    answer.save()
                    
                    //save answers to survey table
                    survey.survey_answer.push(answer)
                    survey.save()
                    req.flash("success", "Successfully answered.")
                    res.redirect("/")
                }
            })
        }
    })
})

// Display of end page of respondent page
router.get("/response/end",function(req, res) {
    res.render("respondents/end_Page")
})

/*
    Respondent Survey - DELETE answers to answer model
    Edited by Yuxuan He at 05/04/2018
*/
// router.delete("/response/:id", middleware.checkQuestionOwnership, function(req, res) {
//     // Find ID and Delete the question_id
//     Answer.findByIdAndRemove(req.params.question_id, function(err){
//         if (err) {
//             res.redirect("back")
//         } else {
//             req.flash("success", "This Answer Successfully Deleted")
//         }
//     })
// })





function escapeRegex(text) {
    // Matches any number of characters globally
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router