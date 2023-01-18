const express = require ("express");

const app = express();

const port = 3000;

const bodyParser = require ('body-parser');

app.use(bodyParser.json()); //This looks for incoming data

app.get("/",(req, res) => {
    res.send("hello world");
});

app.post('/login', (req,res) => {
    const loginUser = req.body.userName;
    console.log('login username: '+loginUser);
    res.send('Hello '+ loginUser);
})

app.listen(port,() => {
    console.log("listening");
});






//  http://localhost:3000
// this is going the be the website needed to see the website on the listening port