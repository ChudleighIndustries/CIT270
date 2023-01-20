const express = require ("express");

const app = express();

const port = 3000;

const bodyParser = require ('body-parser');

const {v4: uuidv4} = require('uuid');

app.use(bodyParser.json()); //This looks for incoming data

app.get("/",(req, res) => {
    res.send("hello levi");
});

app.post('/login', (req,res) => {
    const loginUser = req.body.userName;
    const loginPassword = req.body.password; //Access the password data in the body 
    console.log('login username: '+loginUser);
    if (loginUser=="levichud@gmail.com" && loginPassword=="P@$$w0rD"){
        const loginToken = uuidv4().toString();
        res.send(loginToken);
    } else {
    res.send(401); //unauthorized
    res.send('Inncorrect password for '+loginUser);
    }
})

app.listen(port,() => {
    console.log("listening");
});






//  http://localhost:3000
// this is going the be the website needed to see the website on the listening port