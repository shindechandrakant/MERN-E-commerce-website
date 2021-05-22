const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    
    environment:  braintree.Environment.Sandbox,
    merchantId:   'sn89dzwg2wdt4h82',
    publicKey:    'jrbwptsypm5j5499',
    privateKey:   '6086f70453fd8eba6f65f97c5c85a7e0'
});

// var gateway = braintree.connect({
//     environment:  braintree.Environment.Sandbox,
//     merchantId:   'sn89dzwg2wdt4h82',
//     publicKey:    'jrbwptsypm5j5499',
//     privateKey:   '6086f70453fd8eba6f65f97c5c85a7e0'
// });

exports.getToken = (req, res) => {

    console.log("In token function")
    gateway.clientToken.generate({ }, 
        (err, response) => {

            if(err) {
                console.log("in token err")
                res.status(500).json(err)
            }
            else {
                console.log("in token res")
                res.status(200).json(response)
            }
        });
    }
    
    exports.processPayment = (req, res) => {
        
        let nonceFromTheClient = req.body.paymentMethodNonce
        let _amount = req.body.amount;
        gateway.transaction.sale({
            amount: _amount,
            paymentMethodNonce: nonceFromTheClient,
            deviceData: deviceDataFromTheClient,
            options: {
                submitForSettlement: true
            }
        }, (err, result) => {
            
            if(err) {
                res.status(500).json(err)
            }
            else {
                res.status(200).json(result)
            }
    });

}




