const fs = require('fs')

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

module.exports = {
    writeFile
}