require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose')
const app = express();
const bodyParser = require("body-parser");
const cores = require('cors');
const cookieParser = require('cookie-parser');
const authenticationRoute = require('./backend/routes/authentication')
const userRoute = require('./backend/routes/user')
const categoryRoute = require('./backend/routes/category')
const productRoute = require('./backend/routes/product')
const orderRoute = require('./backend/routes/order')
const paymentRoute = require("./backend/routes/payment")

// Logger 
const log = (msg) => console.log(msg);

// DB Connection
mongoose.connect( process.env.DATABASE ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    ).then( () => {
        log("DB CONNECTED")
    }).catch(err => log(err));
    
    
// Middleware
app.use(bodyParser.json())
app.use(cores());
app.use(cookieParser());

// my Routes
app.use('/api', authenticationRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api', paymentRoute)



// PORT
const PORT = process.env.PORT || 8000;

// Server starting point
app.listen( PORT , () => {
    
    log(`Server is up and listening on ${PORT} `);
});
