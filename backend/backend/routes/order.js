const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication")
const { getUserById, pushOrderinPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const { getOderById, createOrder, getAllOrder, updateStatus, getOrderStatus } = require("../controllers/order")

//params
router.param("userId", getUserById);
router.param("orderId", getOderById);

// routes
//Write
router.post("/order/create/:userId", 
        isSignedIn, 
        isAuthenticated,
        pushOrderinPurchaseList,
        updateStock,
        createOrder
);

// read

router.get("/order/all/:userId", 
        isSignedIn, 
        isAuthenticated, 
        isAdmin, 
        getAllOrder
);

router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus );


module.exports = router;