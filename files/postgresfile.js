
const index = 
`const app = require('./app')
// connection with db
require('./db/postgresConnection')

// importing route.js
require('./route')(app)`

const route =  
`const user_ctrl = require('./controller/user_ctrl')

module.exports = (app) => {

    app.get('/', (req, res) => res.send('service is running'))

    // user apis
    app.post('/user', user_ctrl.create_user)
    app.get('/user/:_id', user_ctrl.get_user)
}`

// const connection = 
// `const mongoose = require('mongoose')
// require('dotenv').config()
// const uri = process.env.DB_URL

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (err) {
//         console.log('Some problem with the connection ' + err)
//     }
//     else {
//         console.log('connected to db')
//     }
// })

// exports.module = mongoose`

const user_model = 
`const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const schema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('user', schema)`

const app = (port)=>{
`const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//const port = 3000

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
app.use(allowCrossDomain)

app.listen(port, () => console.log('Example app listening on port '+port))
}
module.exports = app`

const user_service =
`const user_model = require('../db/model/user')

class UserService{
    constructor(){

    }
    save(data){
        return new Promise((resolve, reject) => {
            let _user = new user_model(data)
            _user.save((err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }
    fetch(query){
        return new Promise((resolve, reject) => {
            user_model.find(query, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    }
}

module.exports = UserService`

const user_ctrl =
`const UserSrvc = require('../services/user_service')
const user_service = new UserSrvc()

const create_user = async (req, res) => {
    try{
        const result = await user_service.save(req.body)
        res.send(result)
    } catch(err){
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

const get_user = async (req, res) => {
    try{
        const result = await user_service.fetch({ _id: req.params._id })
        res.status(200).send(result)
    } catch(err){
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = {
    create_user,
    get_user
}`

const env = 
`DatabaseUrl=enter Url`

const createPackageJson = (app_name) => {
    return `{
        "name": "${app_name}",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "start": "node index.js",
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
}

const postgresConnection = 
`
const connect = async (process.env.DatabaseUrl,TableCreation)=>{
    const {Pool,query} = require('pg');
    //credentials
    const dbUrl = DatabaseUrl;
    const pool = new Pool({
    connectionString : dbUrl
    })
    pool.connect()
    .then(res=>{
        console.log("connected to db");
    })
    .catch(error=>{
        console.log("Error is -->",error);
    });
    
}

`
const addRecords = 
`
const {Pool,query} = require('pg');
const dbUrl = require('../index');

const insertRecords = async (req,res)=>{
    const pool = new Pool({
        connectionString:dbUrl.dbURL
    })
    pool.connect().then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    });
    try{
    var query = pool.query("insert into dbname (firstName,lastName,email,mobile) "+ 
    "values ('"+req.body.fName+"','"+req.body.lName+"','"+
        req.body.email+"','"+req.body.mbl+"')");
    query.on('end',(result)=>{
        res.status(200).send('Inserted data successfully');
    })
}
catch(error){
    console.log(error);
    res.send(error);
}
}
module.exports={
    insertRecords
}
`

module.exports = {
    index,
    route,
    connection,
    user_model,
    user_service,
    user_ctrl,
    app,
    env,
    createPackageJson,
    postgresConnection,
    addRecords
}