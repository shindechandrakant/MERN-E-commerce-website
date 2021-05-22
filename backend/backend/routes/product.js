const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication")
const { getUserById } = require("../controllers/user");
const { 
        getProductById, 
        createProduct, 
        getProduct, 
        photo,
        deleteProduct,
        updateProduct,
        getAllProducts,
        getAllUniqueCategory
} = require("../controllers/product");

// params
router.param("productId", getProductById);
router.param("userId", getUserById);

// My Routes

// create Route
router.post("/product/create/:userId", 
        isSignedIn, 
        isAuthenticated, 
        isAdmin,
        createProduct
        );
        
// update
router.put("/product/:productId/:userId", 
        isSignedIn, 
        isAuthenticated, 
        isAdmin,
        updateProduct
);

// Read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete route

router.delete("/product/:productId/:userId", 
        isSignedIn, 
        isAuthenticated, 
        isAdmin,
        deleteProduct
);



// listing routes

router.get("/products", getAllProducts);

router.get("/product/categories", getAllUniqueCategory);




module.exports = router;

