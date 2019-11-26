#!/usr/bin/env node
const program = require('commander')
// const { prompt } = require('inquirer')
const fs = require('fs')
const files = require('./files/file')
const util = require('./utils/utility')

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
            // console.log('folder created')

            // create index.js
            await util.writeFile('node-template/index.js', files.index)
            // console.log('index.js created')

            // create route.json
            await util.writeFile('node-template/route.js', files.route)
            // console.log('route.js created')

            // create package.json
            await util.writeFile('node-template/package.json', files.package)
            // console.log('package.json created')

            console.log('Node js project created')
        }
        
    })

program
    .parse(process.argv)