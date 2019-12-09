#!/usr/bin/env node
const program = require('commander')
// const { prompt } = require('inquirer')
const fs = require('fs')
const files = require('./files/file')
const util = require('./utils/utility')

const dir_name = 'node-template';

program
    .version('1.0.4')
    .description('A command line tool to generate node.js template')

program
    .command('create')
    .alias('c')
    .description('create project')
    .action(async () => {
        if (!fs.existsSync(`./${dir_name}`)){
            await fs.mkdirSync(`./${dir_name}`);
            // console.log('folder created')

            // create index.js
            await util.writeFile(`${dir_name}/index.js`, files.index)

            // create app.js
            await util.writeFile(`${dir_name}/app.js`, files.app)

            // create route.json
            await util.writeFile(`${dir_name}/route.js`, files.route)

            // create package.json
            await util.writeFile(`${dir_name}/package.json`, files.package)

            // create .env
            await util.writeFile(`${dir_name}/.env`, files.env)

            // create db folder
            await util.makeDir(`${dir_name}/db`)

            // create connection.js file inside db folder
            await util.writeFile(`${dir_name}/db/connection.js`, files.connection)

            // create model folder
            await util.makeDir(`${dir_name}/db/model`)

            // create user.js file inside db/model/ folder
            await util.writeFile(`${dir_name}/db/model/user.js`, files.user_model)

            // create services folder
            await util.makeDir(`${dir_name}/db/services`)

            // create user_service.js file inside db folder
            await util.writeFile(`${dir_name}/db/services/user_service.js`, files.connection)

            // create controller folder
            await util.makeDir(`${dir_name}/db/controller`)

            // create user_ctrl.js file inside db folder
            await util.writeFile(`${dir_name}/db/controller/user_ctrl.js`, files.connection)

            console.log('Template created')
        }
        
    })

program
    .parse(process.argv)