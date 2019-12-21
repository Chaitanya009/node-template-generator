#!/usr/bin/env node
const program = require('commander')
const { prompt } = require('inquirer')
const fs = require('fs')
const files = require('./files/file')
const util = require('./utils/utility')
const { exec } = require("child_process");

const questions = [
    {
        type: 'list',
        name: 'database',
        message: 'Please select database',
        choices: ['mongodb', 'postgresql']
    }
]

program
    .version('1.1.0')
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
                    // create index.js
                    await util.writeFile(`${dir_name}/index.js`, files.index)

                    // create app.js
                    await util.writeFile(`${dir_name}/app.js`, files.app)

                    // create route.json
                    await util.writeFile(`${dir_name}/route.js`, files.route)

                    // create package.json
                    await util.writeFile(`${dir_name}/package.json`, files.createPackageJson(dir_name))

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
                    await util.makeDir(`${dir_name}/services`)

                    // create user_service.js file inside db folder
                    await util.writeFile(`${dir_name}/services/user_service.js`, files.user_service)

                    // create controller folder
                    await util.makeDir(`${dir_name}/controller`)

                    // create user_ctrl.js file inside db folder
                    await util.writeFile(`${dir_name}/controller/user_ctrl.js`, files.user_ctrl)

                    try {
                        await util.runCommand(`cd ${dir_name} && npm install && npm start`)
                    } catch (err) {
                        console.log(err)
                    }
                    console.log('Template created')
                } else {
                    console.log('under maintainence please select another option')
                }
            })
        }
        // else if (result.database == 'postgres') {
        //     // create connection.js file inside db folder
        //     await util.writeFile(`${dir_name}/db/connection.js`, files.postgresConnection);


        // }
        else {
            console.log(`${dir_name} folder already exists`)
        }

    })

program
    .parse(process.argv)