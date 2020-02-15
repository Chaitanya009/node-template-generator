
const index =
    `const app = require('./app')
// connection with db
var connection = require('./db/connection')


// importing route.js
require('./route')(app)`

const route =
    `const userCtrl = require('./controller/user')

    module.exports = (app) => {
    
        app.get('/', (req, res) => res.send('service is running'))
    
        // user apis
        app.post('/user', userCtrl.createUser)
        app.get('/user', userCtrl.getUser)
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


const userService =
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
    
    const save = (data) => {
        const query = {
            text: 'INSERT INTO users (first_name, last_name, address, email, phone_number) VALUES($1, $2, $3, $4, $5)',
            values: [data.first_name, data.last_name, data.address, data.email, data.phone_number],
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    // console.log(err)
                    reject(err)
                } else {
                    // console.log(res.rows[0])
                    resolve(data)
                }
            })
        })
    }
    
    const fetch = () => {
        const query = {
            text: 'SELECT * FROM users'
        }
        return new Promise((resolve, reject) => {
            pool.query(query, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(res.rows[0])
                    resolve(res.rows)
                }
            })
        })
    }
    
    // const remove = async (req, res) => {
    //     if (req.body.phone_number) {
    //         pool.query("delete from users where phone_number = $1", [req.body.phone_number])
    //             .then(() => {
    //                 res.status(200).send({ "message": "Successfully deleted record" })
    //             })
    //             .catch((error) => {
    //                 res.status(500).send(error)
    //             })
    //     }
    //     else {
    //         pool.query("Delete from  users")
    //             .then(() => {
    //                 res.status(200).send({ "message": "Deleted table successfully" })
    //             })
    //             .catch((error) => {
    //                 res.status(500).send(error);
    //             })
    //     }
    // }
    module.exports = {
        fetch,
        save
    }`

const userCtrl =
    `const userService = require('../services/user')
    
    const createUser = async (req, res) => {
        try{
            const result = await userService.save(req.body)
            res.send(result)
        } catch(err){
            res.status(500).send({
                message: "Internal server error"
            })
        }
    }
    
    const getUser = async (req, res) => {
        try{
            const result = await userService.fetch()
            res.status(200).send(result)
        } catch(err){
            res.status(500).send({
                message: "Internal server error"
            })
        }
    }
    
    module.exports = {
        createUser,
        getUser
    }`

const createEnv = (db_url) => {
    return `DB_URL = ${db_url}`
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
} `
}

const connection =
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

    pool.query("create table users(first_name varchar(255), last_name varchar(255), address VARCHAR(255), email VARCHAR(255),phone_number INT)")
        .then((result) => {
            //console.log(result);
            pool.end();
        })
        .catch((error) => {
            console.error(error.message);
            pool.end();
        });

}
connect();
module.exports = {
    connect
}`

module.exports = {
    index,
    route,
    userService,
    userCtrl,
    app,
    createEnv,
    createPackageJson,
    connection
};
