// const path = require('path')
// const fs = require('fs')

let isProduction = (process.env.ENV || process.argv[2]) != "dev"
console.log(`Using ${isProduction ? 'prod' : 'dev'} environment.`)

let env = {
    "api":{
        "port": process.env.PORT,
        "cleanDbBeforeRun": !isProduction,
        "enableTestMode": !isProduction
    }
}

export = env

//A supprimer à terme VLO