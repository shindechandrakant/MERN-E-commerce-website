const User = require('../models/user')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var expressJwt = require('express-jwt');




// Logger 
const log = (msg) => console.log(msg);

exports.signup = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        let msgs = [];
        errors.array().forEach(err =>  msgs.push(err.msg))
        return res.status(422).json({
            error : msgs
        });
    }
    const user = new User(req.body);

    user.save((err, user) => {

        if(err) {

            return res.status(400).json({
                status: 400,
                message: "Not Able to save User into DB",
                error : err.message
            });
        }
        return res.status(200).json({
            status: 200,
            message: "User saved successfully",
            user,
            error: false
        });

    })








    // log(`POST REQ :- ${ JSON.stringify(req.body) }`)
    // res.json({

    //     message: "user signup",
    //     route: req.url,
    //     body: req.body
    // });
}

exports.signin = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        const msgs = [];
        errors.array().forEach(error => msgs.push(error.msg))
        return res.status(422).json({
            error : msgs
        })
    }

    const { email, password } = req.body;

    User.findOne({email} , (err, user) => {

        if(err || !user) {
            return res.status(400).json({
                error : "User email does not exists"
            });
        }

        if(! user.authenticate(password)) {

            return res.status(402).json({
                error : "Incorrect Password"
            });
        }
        // Create Json token
        const token = jwt.sign({ _id : user._id }, process.env.SECREAT);

        //add token in cookie
        res.cookie("token", token, {expire : new Date() + 7});
        // Send response to frontEnd
        const { _id, name, email, role } = user;
        return res.json({ token, user : {
            _id, name, email, role
        }});
    });



} 

exports.signout = (req, res) => {

    // value must be same as u used that while selecting
    res.clearCookie("token");
    res.json({
        message: "User signout successfully",
        route: req.url,
        body: req.body
    })
}


exports.isSignedIn = expressJwt({
    secret : process.env.SECREAT,
    userProperty: "auth",
    algorithms: ['HS256']
});

exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if(!checker) {

        return res.status(403).json({
            error : "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    
    if(!req.profile.role === 0) {

        return res.status(403).json({
            error : "ACCESS DENIED, you are just user"
        });

    }
    next();
}











