
const index =
    `const app = require('./app')
// connection with db
var connection = require('./db/postgresConnection')
connection()

// importing route.js
require('./route')(app)`

const route =
    `//const user_ctrl = require('./controller/user_ctrl')

module.exports = (app) => {

    app.get('/', (req, res) => res.send('service is running'))

    // user apis
    //app.post('/user', user_ctrl.create_user)
    //app.get('/user/:_id', user_ctrl.get_user)
}`



const app =
    `const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

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

app.listen(port, () => console.log('Example app listening on port 3000'))

module.exports = app`


const user_service =
    `const { Pool, query } = require('pg');
     require('dotenv').config()

     const dbUrl = process.env.DB_URL;
        const pool = new Pool({
            connectionString: dbUrl
        })
        pool.connect()
            .then(res => {
                
            })
            .catch(error => {
                console.log("Error is -->", error);
            });
            

    const fetchall = async (req,res) => {   
                pool.query("select * from users")
                .then((result)=>{res.status(200).send(result)})
                .catch((error)
                {
                    res.send(error);
                });
    
    }
    const insertRecords = async (req,res)=>{
         pool.query("insert into users (firstname,lastname,address,email,phone_number) 
         values($1,$2,$3,$4,$5,$6)",[req.body.firstname,req.body.lastname,req.body.address,
            req.body.email,req.body.phone_number])
             .then((result)=>{
                 res.status(200).send(result);
             })
             .catch((error) =>{
                 console.log(error);
                 res.send(error);
             })
        }
    const Delete =  async (req.res)=>{
        if(req.body.phoneNumber){
            pool.query("delete from users where phone_number = $1",[req.body.phone_number])
            .then(()=>{
                res.status(200).send({"message":"Successfully deleted record"})
            })
            .catch((error)=>{
                res.status(500).send(error)
            })
        }
        else {
            pool.query("Delete from  users")
            .then(()=>{
                res.status(200).send({"message":"Deleted table successfully"})})
            .catch((error)=>{
                res.status(500).send(error);
            })
        }
    }
    module.exports={
        fetchall,
        insertRecords,
        Delete
    }`

const env = (db_url) => {
    return `DB_URL=${db_url}`
}

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
            "dotenv": "^8.1.0",
            "pg": "^7.18.1"
        }
    }`
}

const postgresConnection =
    `const { Pool, query } = require('pg');
    require('dotenv').config()
    
    
    const connect = async (TableCreation) => {
        //credentials
        const dbUrl = process.env.DB_URL;
        const pool = new Pool({
            connectionString: dbUrl
        })
        pool.connect()
            .then(res => {
                console.log("connected to db");
            })
            .catch(error => {
                console.log("Error is -->", error);
            });

            pool.query("create table users(firstname varchar(255), lastname varchar(255), address VARCHAR(255), email VARCHAR(255),phone_number INT)")
            .then((result)=>{
                console.log(result);
                pool.end();
            })
            .catch((error)=>{
                console.log(error);
                pool.end();
            }); 
    
    }
    module.exports={
        connect
    }`

module.exports = {
    index,
    route,
    user_service,
    app,
    env,
    createPackageJson,
    postgresConnection
};
