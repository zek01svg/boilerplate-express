let express = require('express');
let app = express();
let path = require('path');
const { nextTick } = require('process');
require('dotenv').config()

let absolutePath = path.join(__dirname, 'views', 'index.html');

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// define the middleware function
function consoleLogger (req,res,next){ 
    // log the request method, path, and ip address to the console
    console.log(`${req.method} - ${req.path} - ${req.ip}`)
    next()
}
app.use(consoleLogger)

app.get('/', (req, res) => {
    res.sendFile(absolutePath);
});

// this route returns the time of the request in json
app.get('/now', function logTime (req, res, next) {
    req.time = new Date().toString()
    next()
}, function(req, res) {
    res.json({"time": req.time})
})

app.get('/json', (req, res)=>{
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        res.json({"message": "HELLO JSON"})
    }
    else {
        res.json({"message": "Hello json"})
    }
    
})

app.get('/:word/echo', (req, res) => {
    res.json({echo:req.params.word})
})

app.get('/name',(req, res) => {
    const first = req.query.first
    const last = req.query.last
    res.json({ name: `${first} ${last}`})
})
app.post('/name',(req, res) => {
    res.json({"name": req.query.name})
})


module.exports = app;