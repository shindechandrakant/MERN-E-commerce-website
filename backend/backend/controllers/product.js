const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


exports.getProductById = (req, res, next, id) => {

    console.log("in getProductId n id is ", id)
    Product.findById(id)
    .populate("category")
    .exec( (err, product) => {

        if(err) {
            return res.status(400).json({
                msg : "Product not found!",
                error : err
            });
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req, res) => {

    console.log("I'm hitting")
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {

        if(err) {
            return res.status(400).json({
                msg : "problem with images",
                error : err
            });
        }


        const { name, description, price, category, stock } = fields;

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                msg : "Fields not filled properly",
                error : "Please include all fields"
            })
        }

        let product = new Product(fields);

        // handle file here
        if(file.photo) {

            if(file.size > 3000000) {

                return res.status(400).json({
                    error : "photo size too Big... it must be less than 3"
                })
            }
            
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }

        // save to DB
        product.save((err, product) => {

            if(err) {
                return res.status(400).json({
                    msg : "failed to create Product!",
                    error : err
                });
            }
            res.json({
                
                msg : "Product saved successfully",
                product: product
            });
        });

    });
}

exports.getProduct = (req, res) => {

    req.product.photo = undefined;
    return res.json(req.product)
}

exports.photo = (req, res) => {

    if(req.product.photo.data) {
    
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }

    next();
}

// delete product
exports.deleteProduct = (req, res) => {

    let product = req.product;

    Product.deleteOne( { _id: product._id}, (err, deletedProduct) => {

        if(err) {
            res.status(400).json({
                msg : "Unable to delete product!",
                error : err
            })
        }

        res.status(400).json({
            msg : "Product deleted successfully!",
            deletedProduct : deletedProduct
        });

    });

}

exports.updateProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    console.log("in product update : ", req.product)
    form.parse(req, (err, fields, file) => {

        if(err) {
            return res.status(400).json({
                msg : "problem with images",
                error : err
            });
        }

        // Updation code
        let product = req.product;
        product = _.extend(product, fields);

        // handle file here
        if(file.photo) {

            if(file.size > 3000000) {

                return res.status(400).json({
                    msg : "photo size too Big... it must be less than 3"
                })
            }
            
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }

        // save to DB
        product.save((err, product) => {

            if(err) {
                return res.status(400).json({
                    msg : "failed to update Product!",
                    error : err
                });
            }
            res.json({
                
                msg : "Product updated successfully",
                product: product
            });
        });

    });
}


exports.getAllProducts = (req, res) => {

    const limit = req.query.limit ? parseInt(req.query.limit) : 7;
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {

        if(err) {
            return res.status(400).json({
                msg : "Unable to get Products",
                error : err
            });
        }

        res.status(400).json(products);
    });
}


exports.updateStock = (req, res, next) => {

    let myOperations = req.body.order.products.map( (product) => {

        return {
            updateOne: {
                filter: { _id: product._id},
                update: {$inc : {stock : -product.count, sold: +product.count}  }
            }
        }
    });

    Product.bulkWrite(myOperations, { }, (err, product) => {

        if(err) {
            return res.status(400).json({
                msg : "failed to update stock",
                error : err
            });
        }

        next();
    })



}


exports.getAllUniqueCategory = (req, res) => {

    Product.distinct("category", {}, (err, category) => {

        if(err) {
            return res.status(400).json({
                msg : "Unable to get categories",
                error : err
            });
        }

        res.json(category)

    })


}


