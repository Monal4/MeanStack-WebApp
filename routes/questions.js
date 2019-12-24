var express = require("express")
var router  = express.Router({mergeParams: true}) // mergeParams used to merge questions together. so that ID can be accessed.
var Survey  = require("../models/survey")
var Question = require("../models/question")
var middleware = require("../middleware/index")
var multer = require('multer');
var route_n = 391186297465389
var route_s = "FfH30umQHX-JMsTU48tg3uayrVs"

// Multer & Cloudinary Config
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'surveyfyassets', 
  api_key: route_n, 
  api_secret: route_s
});

// QUESTION ROUTES

// QUESTION - Show Form to create questions
router.get("/new", middleware.isLoggedIn,function(req, res) {
    Survey.findById(req.params.id, function(err, survey) {
        if (err) {
            console.log(err)
        } else {
            res.render("questions/new", {survey, survey})
        }
    })
})


    
    // QUESTION - Create add new question to survey
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) { // }) -1  
if (req.file) {
        Survey.findById(req.params.id, function(err, survey) { // }) -2 
        if (err) {
            console.log(err)
            res.redirect("/surveys")
        } else { // } -3
            cloudinary.uploader.upload(req.file.path, function(result) { // }) -4
              // add cloudinary url for the image to the question object under image property
              req.body.question.image = result.secure_url;
              // add author to question
            //   req.body.question.author = {
            //     id: req.user._id,
            //     username: req.user.username
            //  }
            // create new question
            Question.create(req.body.question, function(err, question) { // -5
                if (err) {
                    req.flash("error", "The Create Operation not Successful.")
                    console.log(err)
                    return res.redirect("back")
                } else {
                    // add new question to survey
                    // ADD - USERNAME & ID TO QUESTION
                    question.author.id = req.user._id
                    question.author.username = req.user.username
                    question.author.firstName = req.user.firstName
                     console.log(question)
                    // SAVE - question
                    question.save()
                    
                    survey.questions.push(question)
                    survey.save()
                    // redirect to surveys page
                    
                    req.flash("success", "Successfully Created a Question.")
                    res.redirect("/surveys/" + survey._id)
                }
            }) // -5
            
            }) // }) -4
            
        } // } -3
        
            })
            } else {
                console.log(req.body.question.options[0].content[0]);
                Survey.findById(req.params.id, function(err, survey) { // }) -2 
                if (err) {
                    console.log(err)
                    res.redirect("/surveys")
                } else { // } -3
                
                Question.create(req.body.question, function(err, question) { // -5
                    if (err) {
                        req.flash("error", "The Create Operation not Successful.")
                        console.log(err)
                        return res.redirect("back")
                    } else {
                        
                        // add new question to survey
                        // ADD - USERNAME & ID TO QUESTION
                        question.author.id = req.user._id
                        question.author.username = req.user.username
                        question.author.firstName = req.user.firstName
                         
                        // SAVE - question
                        question.save()
                        
                        console.log(question)
                        
                        survey.questions.push(question)
                        survey.save()
                        // redirect to surveys page
                       
                       res.send(question)
                        req.flash("success","Successfully Created a Question.")
                        //res.redirect("/surveys/" + survey._id)
                    }
                }) // -5
                
                 // }) -4
                
            } // } -3
            
                })
                }
            // }) -2
    }) // }) -1


// EDIT - Question Route Edit
// router.get("/:question_id/edit", middleware.checkQuestionOwnership, function(req, res){
//     Question.findById(req.params.question_id, function(err, foundQuestion) {
//         if (err) {
//             res.redirect("back")
//         } else {
//             res.render("questions/edit", {survey_id: req.params.id, question: foundQuestion})
//         }
//     })
   
// });

// EDIT QUESTION with SKIP PATTERN - Ganesh Velu // 29th September 2018
router.get("/:question_id/edit", middleware.checkQuestionOwnership, function (req, res) {
    Question.findById(req.params.question_id).lean().exec(function (err, foundQuestion) {

        if (err) {
            console.log(err);
            res.redirect("back")
        }
        Survey.findById(req.params.id, function (err, surveys) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                console.log(surveys)
                let surveyTrack = {}
                surveys.questions.forEach((survey,i) => {
                surveyTrack[survey] = 'Q'+(i+1);
                });
                foundQuestion.options.forEach(option => {
                    if(option.skipId) {
                        option.skippedToQuestion = surveyTrack[option.skipId]
                    }
                })
             
                console.log('-----------------------ssssssssssss------------------------------------------')
                console.log(foundQuestion.options)
                res.render("questions/edit", { survey_id: req.params.id, question: foundQuestion, survey: surveys });
            }
        });
    })

});

// UPDATE - Question Route Update
router.put("/:question_id", middleware.checkQuestionOwnership, function(req, res) {
  console.log(req.body.question.options)
    Question.findByIdAndUpdate(req.params.question_id, req.body.question, function(err, updatedQuestion){
      if(err){
          res.redirect("back");
      } else {
          res.send(req.body.question);
      }
   });
})

// DELETE - Question Route Delete
router.delete("/:question_id", middleware.checkQuestionOwnership, function(req, res) {
    // Find ID and Delete the question_id
    Survey.findByIdAndUpdate(req.params.id, { "$pull": { "questions": req.params.question_id }}, function(err, data) {
        if (err) {
            console.log(err)
        }
    })
    Question.findByIdAndRemove(req.params.question_id, function(err){
        if (err) {
            // Redirects back to the previous page
            res.redirect("back")
        } else {
            res.send("Successfully deleted the question")
        }
    })
})






module.exports = router