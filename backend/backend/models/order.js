const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;


const ProductCartSchema = new mongoose.Schema({

    product : {
        type: ObjectId,
        ref : "Product"
    },
    name: String,
    count:  String,
    price: Number
});

const ProductCart = mongoose.model('ProductCart', ProductCartSchema);


const orderSchema = new mongoose.Schema({

    products: [ ProductCartSchema ],
    transaction_id: { },
    amount: { type: Number },
    address: String,
    status : {
        type: String,
        default : "Recieved",
        enum: [
            "Cancelled",
            "Delivered",
            "Shipped",
            "Processing",
            "Recieved"
        ]
    },
    updated: Date,
    user: {
        type : ObjectId,
        ref: "User"
    }
},
{timestamps : true}
); // End of orderSchema


const Order = mongoose.model("Order", orderSchema);

module.exports = {

    ProductCart,
    Order
}



