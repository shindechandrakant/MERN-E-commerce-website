const express = require('express');
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require('../controllers/authentication')
const { check } = require('express-validator');


router.post('/signup', 
    [
        check('name', "Name should contain at least 3 chars").isLength({ min: 3 }),
        check('email', "Email is required..").isEmail(),
        check('password', "Password should be at least 3 chars").isLength({ min: 3 })
    ], 
    signup)

    
router.post('/signin', 
[
    check('email', "Email is required..").isEmail(),
    check('password', "Password field is required").isLength({ min: 1 })
], 
signin);
    

router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {

    res.json("A Protected route");
});

module.exports = router;

