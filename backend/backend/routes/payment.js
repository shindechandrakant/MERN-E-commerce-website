const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/authentication")
const { getUserById }  = require("../controllers/user")
const { getToken, processPayment } = require("../controllers/payment")

router.param("userId", getUserById);

router.get('/payment/gettoken/:userId', isSignedIn, isAuthenticated, getToken)

router.post('/payment/braintree/:userId', isSignedIn, isAuthenticated, processPayment)

module.exports = router;