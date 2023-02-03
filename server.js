const express = require ("express");

const app = express();

const port = 3000;

const bodyParser = require ('body-parser');

const Redis = require ('redis');

const redisClient = Redis.createClient({url:"redis://127.0.0.1:6379"});

const {v4: uuidv4} = require('uuid');

app.use(bodyParser.json()); //This looks for incoming data

app.use(express.static('public'));
app.post('/rapidsteptest', async (req, res)=>{
    const steps = req.body;
    await redisClient.zAdd('steps', steps, 0);
    console.log("Steps", steps);
    res.send('saved');
    });
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get("/", (req, res)=> {
    res.send("Hello Levi");
});

app.get("/validate", async(req, res) =>{
    const loginToken = req.cookies.stedicookie;
    const loginUser = await redisClient.hGet('TokenMap', loginToken)
    res.send(loginUser);
});

app.post('/login', async(req, res) =>{
    const loginUser = req.body.userName;
    const loginPassword = req.body.password;
    console.log(req.body);
    console.log('Login username: '+loginUser);
    const correctPassword = await redisClient.hGet('UserMap', loginUser);
    if (loginPassword==correctPassword){
        const loginToken = uuidv4();
        await redisClient.hSet('TokenMap', loginToken, loginUser);
        res.cookie('stedicookie',loginToken);
        res.send(loginToken);
    } else {
        res.status(401);
        res.send('Incorrect password for ' +loginUser);
    }
});

app.listen(port, () =>{
    redisClient.connect();
    console.log("Listening");
});

//  http://localhost:3000
// this is going the be the website needed to see the website on the listening port