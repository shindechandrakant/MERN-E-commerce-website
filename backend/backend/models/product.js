const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema({

    name : {
        type : String,
        required : true,
        trim: true,
        maxlength: 32
    }, 
    description : {
        type : String,
        required : true,
        trim: true,
        maxlength: 100
    }, 
    price: {

        type: Number,
        required: true,
        maxlength: 100,
        trim: true
    },
    category : {

        type: ObjectId,
        ref: "Category",
        required: true
    },

    stock : {
        type: Number
    },
    sold : {
        type: Number,
        default: 0
    },
    photo: {
        data : Buffer,
        contentType : String
    }


}, 
{ timestamps : true }
); //end of product schema


module.exports = mongoose.model('Product', productSchema);









