#!/usr/bin/env node
const program = require('commander')
// const { prompt } = require('inquirer')
const fs = require('fs')

const dir = './node-template';

program
    .version('1.0.0')
    .description('Node template generator')

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
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening on port 3000'))
                    `)
            console.log('index.js created')

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