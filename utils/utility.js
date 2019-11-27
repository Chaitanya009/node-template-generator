const fs = require('fs')

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

module.exports = {
    writeFile,
    makeDir
}