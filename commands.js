#!/usr/bin/env node
const program = require('commander')
// const { prompt } = require('inquirer')
const fs = require('fs')

const dir = './node-template';

program
    .version('1.0.3')
    .description('A command line tool to generate node.js template')

program
    .command('create')
    .alias('c')
    .description('create project')
    .action(async () => {
        if (!fs.existsSync(dir)){
            await fs.mkdirSync(dir);
            console.log('folder created')

            // create index.js
            await writeFile('node-template/index.js', `
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const allowCrossDomain = function (req, res, next) {
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

require('./route')(app)

app.listen(port, () => console.log('Example app listening on port 3000'))
                    `)
            console.log('index.js created')

            // create route.json
            await writeFile('node-template/route.js', `
module.exports = (app) => {

    app.get('/', (req, res) => res.send('Hello World!'))
}      
            `)
            console.log('route.js created')

            // create package.json
            await writeFile('node-template/package.json', `
{
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
        "express": "^4.17.1"
    }
}        
            `)
            console.log('package.json created')
        }
        
    })

const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if(err) reject(err)
            else resolve('file created')
        })
    })
}

// const makeDir = () => {
//     return new Promise((resolve, reject) => {
//         fs.mkdirSync('./node-template', 
//         (err) => {
//             if(err) reject(err)
//             else resolve('folder created')
//         })
//     })
// }

program
    .parse(process.argv)