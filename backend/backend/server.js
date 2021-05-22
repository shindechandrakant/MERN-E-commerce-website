const express = require('express');
const app = express();
const PORT = 7000;

app.get('/', (req, res) => {

    res.status(200).send({
        "Message" : "Hello there !! Lets start MERN",
        "status" : 200
    })
})

app.listen(PORT, () => {
    
    console.log(`Server is up & running on port ${PORT}`);
});




