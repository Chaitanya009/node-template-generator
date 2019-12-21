const fs = require('fs')
const { exec } = require("child_process");
const execa = require('execa');
const path = require('path');

const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            err ? reject(err) : resolve('file created')
        })
    })
}

const makeDir = (dir_name) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir_name, { recursive: true }, (err) => {
            err ? reject(err) : resolve('folder created')
        })
    })
}

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        execa.shell(command, {
            stdio: 'inherit'
        })
        // exec(command, (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(`error: ${error.message}`);
        //         reject(error);
        //     }
        //     if (stderr) {
        //         // console.log(`stderr: ${stderr}`);
        //         reject(stderr);
        //     }
        //     console.log(`${stdout}`);
        //     resolve(stdout)
        // });
    })
}

module.exports = {
    writeFile,
    makeDir,
    runCommand
}