const { Order, ProductCart } = require("../models/order")

exports.getOderById = (req, res, next, orderId) => {

    Order.findById(orderId)
    .populate("product.product", "name price")
    .exec( (err, order) => {

        if(err) {
            return res.status(400).json({
                msg : "No Order found in DB",
                error : err
            });
        }

        req.order = order;
        next();
    });
}


exports.createOrder = (req, res) => {

    req.body.order.user = req.profile;
    const order = new Order(req.body.order.user);

    order.save( (err, order) => {

        if(err) {
            return res.status(400).json({
                msg : "Unable to save order in DB",
                error : err
            });
        }
        res.json(order)
    });
}


exports.getAllOrder = (req, res) => {

    Order.find()
        .populate("user", "name _id")
        .exec( (err, oders) => {

            if(err) {
                return res.status(400).json({
                    msg : "Unable to get orders from DB",
                    error : err
                });
            }

            res.status(400).json(oders)

        });

}


exports.updateStatus = (req, res) => {


    Order.update(

        { _id : req.body.orderId},
        { $set : { status : req.body.status }},
        (err, order) => {

            if(err) {
                return res.status(400).json({
                    msg : "Unable to get orders from DB",
                    error : err
                });
            }

            res.status(200).json(order);
        }

    );


}


exports.getOrderStatus = (req, res) => {

    res.json(Order.schema.path("status").enumValues)
}