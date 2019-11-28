const index = 
`const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

// connection with db
require('./db/connection')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Accept,Content-Length, X-Requested-With, X-PINGOTHER');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

// importing route.js
require('./route')(app)

app.listen(port, () => console.log('Example app listening on port 3000'))`

const route =  
`module.exports = (app) => {

    app.get('/', (req, res) => res.send('Hello World!'))
}`

const package = 
`{
    "name": "test",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo 'Error: no test specified' && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "express": "^4.17.1",
        "mongoose": "^5.6.9",
        "dotenv": "^8.1.0"
    }
}`

const connection = 
`const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.DB_URL

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Some problem with the connection ' + err)
    }
    else {
        console.log('connected to db')
    }
})

exports.module = mongoose`

const env = 
`DB_URL=mongodb://localhost:27017/test`


module.exports = {
    index,
    route,
    package,
    connection,
    env
}