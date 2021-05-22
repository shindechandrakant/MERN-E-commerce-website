const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const categorySchema = new Schema({

    name : {
        type : String,
        maxlength:32,
        trim : true,
        required: true,
        unique: true
    }


}, 
    {timestamps : true}
);


module.exports = mongoose.model('Category', categorySchema);
