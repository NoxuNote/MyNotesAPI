// const path = require('path')
// const fs = require('fs')
console.log(`Using ${process.argv[2]} environment.`)

let env;
// let envPath = path.join(__dirname, `../../environment/environment.${process.argv[2]}.json`)
// try {
//     env = JSON.parse(fs.readFileSync(envPath))
// } catch {
//     throw new Error(`Cannot find '${envPath}' environment. Please create a 'environment/environment.${process.argv[2]}.ts' file.`)
// }


if (process.argv[2] == "prod") {
    env = {
        "api":{
            "port": 8080,
            "cleanDbBeforeRun":false,
            "enableTestMode":false
        }
    }
    
}

export = env

//A supprimer à terme VLO