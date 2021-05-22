const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto');
// const uuidv1 = require("uuid/v1");
const { v1 : uuidv1 } = require('uuid');

let userSchema = new Schema( { 

    name : {
        type : String,
        required : false,
        maxLength : 32,
        trim : true
    }, 
    lastName : {
        type : String,
        required : false,
        maxLength : 20,
        trim : true
    },
    email: {
        type : String,
        required : true,
        unique : true,
        trim : true
    }, 

    useInfo : {
        type : String,
        trim : true
    },

    // TODO: Password 

    encry_password : {
        type : String,
        required : true
    },

    salt : String,

    role : {
        type : Number,
        default : 0
    }, 
    
    purchases : {
        type : Array,
        default : []
    }
}, {timestamps : true }
); // end of userSchema

userSchema.virtual('password')
        .set(function(password) {

            this._password = password;
            this.salt = uuidv1();
            this.encry_password = this.securePassword(password)
        })
        .get(function() {
            return this._password;
        })



userSchema.methods = {

    authenticate: function(plainPassword) {

        return this.securePassword(plainPassword) === this.encry_password
    }, //end of authenticate

    securePassword : function(plainPassword) {

        if(!plainPassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                    .update(plainPassword)
                    .digest("hex");
        }
        catch(err) {
            return "";
        }
    } // end of secure password
} // end of method


module.exports = mongoose.model("user", userSchema);




