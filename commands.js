#!/usr/bin/env node
const program = require('commander')
const { prompt } = require('inquirer')
const fs = require('fs')
const files = require('./files/file')
const util = require('./utils/utility')
const { exec } = require("child_process");
const postgres = require('./files/postgresfile');

const questions = [
    {
        type: 'list',
        name: 'database',
        message: 'Please select database',
        choices: ['mongodb', 'postgresql']
    },
    {
        type: 'input',
        name: 'databaseUrl',
        message: "Enter database url, if you don't have press enter"
        // default: 'mongodb://localhost:27017/test'
    }
    // ,{
    //     name:'port',
    //     message:'Please give a port',
    //     default:3000
    // }
]

program
    .version('1.1.3')
    .description('A command line tool to generate node.js template')

program
    .command('create <dir_name>')
    .alias('c')
    .description('create project')
    .action(async (dir_name) => {
        if (!fs.existsSync(`./${dir_name}`)) {
            // create project directory
            await fs.mkdirSync(`./${dir_name}`);

            prompt(questions).then(async result => {
                if (result.database == 'mongodb') {
                    try {
                        // create index.js
                        await util.writeFile(`${dir_name}/index.js`, files.index)

                        // create app.js
                        await util.writeFile(`${dir_name}/app.js`, files.app)

                        // create route.json
                        await util.writeFile(`${dir_name}/route.js`, files.route)

                        // create package.json
                        await util.writeFile(`${dir_name}/package.json`, files.createPackageJson(dir_name))

                        // create .env
                        await util.writeFile(`${dir_name}/.env`, files.createEnv(result.databaseUrl))

                        // create .gitignore
                        await util.writeFile(`${dir_name}/.gitignore`, files.gitIgnore)

                        // create db folder
                        await util.makeDir(`${dir_name}/db`)

                        // create connection.js file inside db folder
                        await util.writeFile(`${dir_name}/db/connection.js`, files.connection)

                        // create model folder
                       // await util.makeDir(`${dir_name}/db/model`)

                        // create user.js file inside db/model/ folder
                       // await util.writeFile(`${dir_name}/db/model/user.js`, files.userModel)

                        // create services folder
                        await util.makeDir(`${dir_name}/services`)

                        // create userService.js file inside db folder
                        await util.writeFile(`${dir_name}/services/user.js`, files.userService)

                        // create controller folder
                        //await util.makeDir(`${dir_name}/controller`)

                        // create user.js file inside controller folder
                        //await util.writeFile(`${dir_name}/controller/user.js`, files.userCtrl)

                        await util.runCommand(`cd ${dir_name} && npm install && npm start`)
                    } catch (err) {
                        console.log(err)
                    }
                    // console.log('Template created')
                }
                else if (result.database == 'postgresql') {
                    // console.log('under maintence please select other option')
                    try {
                        // create index.js
                        await util.writeFile(`${dir_name}/index.js`, postgres.index)

                        // create app.js
                        await util.writeFile(`${dir_name}/app.js`, postgres.app)

                        // create route.json
                        await util.writeFile(`${dir_name}/route.js`, postgres.route)

                        // create package.json
                        await util.writeFile(`${dir_name}/package.json`, postgres.createPackageJson(dir_name))

                        // create .env
                        await util.writeFile(`${dir_name}/.env`, postgres.env(result.databaseUrl))

                        // create db folder
                        await util.makeDir(`${dir_name}/db`)

                        // create connection.js file inside db folder
                        await util.writeFile(`${dir_name}/db/postgresConnection.js`, postgres.postgresConnection);

                        // create model folder
                        await util.makeDir(`${dir_name}/db/model`)

                        // create user.js file inside db/model/ folder
                        await util.writeFile(`${dir_name}/db/model/user.js`, postgres.user_model)

                        // create services folder
                        await util.makeDir(`${dir_name}/services`)

                        // create user_service.js file inside db folder
                        await util.writeFile(`${dir_name}/services/user_service.js`, postgres.user_service)

                        // create controller folder
                        await util.makeDir(`${dir_name}/controller`)

                        // create user_ctrl.js file inside db folder
                        await util.writeFile(`${dir_name}/controller/user_ctrl.js`, postgres.user_ctrl)

                        await util.runCommand(`cd ${dir_name} && npm install && npm start`)
                    } catch (error) {
                        console.log(error)
                    }


                }
            })
        } else {
            console.log(`${dir_name} folder already exists`)
        }

    }
    )

program
    .parse(process.argv)
