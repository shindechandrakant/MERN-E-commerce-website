const User = require('../models/user');
const {Order} = require("../models/order");


exports.getUserById = (req, res, next, id) => {

    User.findById(id).exec((err, user) => {

        if(err || !user) {
            
            return res.status(400).json({
                err : "No user find for this id",
                msg : err
            });
        }
        req.profile = user;
        next();
    });
}
    
exports.getUser = (req, res) => {

    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);

}

exports.updateUser = (req, res) => {

    User.findByIdAndUpdate(
        { _id : req.profile._id },
        { $set : req.body },
        { new: true, useFindAndModify : false},
        (err, user) => {

            if(err) {
                return res.status(400).json({
                    error: "You are not authorized to update",
                    msg: err
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;

            res.status(200).json(user);
        }
    );
}

exports.userPurchaseList = (req, res) => {

    Order.find({ user: req.profile._id })
    .populete("user", "_id name")
    .exec( (err, order) => {

        if(!err) {
            return res.status(403).json({
                msg : "No order in this account",
                error: err
            });
        }
        return res.json(order)

    });
}

exports.pushOrderinPurchaseList = (req, res, next) => {

    let purchases = [];

    req.body.order.products.forEach( product => {

        purchases.push({
            _id : product._id,
            name : product.name,
            descriptopn : product.descriptopn,
            category: product.category,
            quantity: product.quantity,
            amount : req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        })
    });

    //Store this in DB
    User.findByIdAndUpdate(
        
        { _id: req.profile._id },
        { $push: { purchases : purchases }},
        {new: true},
        (err, purchase) => {
            if(err) {
                return res.status(400).json({
                    msg: "Unable to save purchase list",
                    err: err
                })
            }
            console.log("Purchases saved Successfully.......");
            next();
        }
    );
}

