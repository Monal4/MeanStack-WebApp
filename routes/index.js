var express     = require("express")
var router      = express.Router()
var passport    = require("passport")
var User        = require("../models/user")
var Survey      = require("../models/survey")
var async       = require("async")
var crypto      = require("crypto")
var nodemailer  = require("nodemailer")
var cookieParser = require('cookie-parser');

// Routes

// Cookie Parser
router.use(cookieParser());

// Index - Route for Index page
router.get("/", function(req, res) {
    // Get all features surveys from database
    
    // $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ]
    Survey.find({featuredSurveys: true, publicSurvey: true}, function(error, allSurveys) {
        if (error) {
            console.log(error)
        } else {
            res.cookie('name', 'Surveyfy Started')
            // res.clearCookie('name')
            res.render("home", {surveys: allSurveys})
        }
    })
})



// About - Route for About
router.get("/about", function(req, res) {
    res.render("about")
})



// AUTHENTICATION - Routes

// Register - Route for registration page display
router.get("/register", function(req, res) {
    res.render("register")
})

// Register Post - Route for registration details to database server
router.post("/register", function(req, res) {
    var newUser = new User({firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username})
    // eval(require("locus"))
    
    // Checks the condition if admin code matches to the given admin code
    if (req.body.adminCode === "123TrentSurvefy100") {
        newUser.isAdmin = true
    }
    
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        } else { // authentication of the user
            passport.authenticate("local") (req, res, function(){
                req.flash("success", "Welcome to Surveyfy, " + user.firstName + ".")
                res.redirect("/surveys")
            })
        }
    })
})

var GMAILPW = "umasssurvey"

// Login Form
router.get("/login", function(req, res) {
    res.render("login")
})

// POST - Login
// passport.authenticate() - is the middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/surveys",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome to Surveyfy!"
}),function(req, res) {
})

// Route Logout - logout()
router.get("/logout", function(req, res) {
    req.logout()
    req.flash("success", "Logged Out")
    res.redirect("/")
})

// Route Get - Forgot Password
router.get("/forgot_password", function(req, res) {
    res.render("forgot_password")
})

// Route Post - Forgot Password Post Method
router.post('/forgot_password', function(req, res, next) {
    // asynchronous waterfall execution of functions
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex')
                done(err, token)
            })
        },
        function(token, done) {
            User.findOne({username: req.body.username}, function(err, user) {
                if (!user) {
                    req.flash('error', "Email Address Doesn't Exist.")
                    return res.redirect('/forgot_password')
                }
                user.resetPasswordToken = token
                user.resetPasswordExpires = Date.now() + 3600000 // The token link expires after an hour
                
                user.save(function(err) {
                    done(err, token, user)
                })
            })
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: "surveyfymass@gmail.com", // change the email address here. 
                    pass: GMAILPW // Change if problem
                }
            })
            var mailOptions = {
                to: user.username,
                from: "surveyfymass@gmail.com",
                subject: "Surveyfy Password Reset Request",
                text: "You are receiving this because you (or someone else) have requested the password reset for your account.\n\n" +
                    "Please click on the following link, or paste this into your browser to successfully complete the process:\n\n" +
                    "http://" + req.headers.host + "/reset/" + token + "\n\n" +
                    "If you did not request this, please ignore this email and your password will remain unchanged.\n"
            }
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('Mail Sent')
                req.flash("success", "An e-mail has been sent to " + user.username + " with further instructions.")
                done(err, 'done')
            })
        }
        
    ], function(err) {
        if (err) return next(err)
        res.redirect('/forgot_password')
    })
})

// Route Get - Reset Password
router.get("/reset/:token", function(req, res) {
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }}, function(err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.')
            return res.redirect('/forgot_password')
        }
        res.render('reset', {token: req.params.token})
    })
})

// Route Post - Reset Password
router.post("/reset/:token", function(req, res) {
    // asynchronous waterfall execution of functions
    async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: "surveyfymass@gmail.com", // change the email address here. 
          pass: GMAILPW // Change if problem
        }
      });
      var mailOptions = {
        to: user.username,
        from: "surveyfymass@gmail.com",
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
})



module.exports = router