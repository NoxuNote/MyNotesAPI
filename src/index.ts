'use strict'

import { sequelize } from "./orm/db"

const env = require('./utils/environment')
const path = require('path')
const http = require('http')
const oasTools = require('oas-tools')
const jsyaml = require('js-yaml')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

const spec = fs.readFileSync(path.join(__dirname, '../environment/api/openapi.yaml'), 'utf8')
const oasDoc = jsyaml.safeLoad(spec)

var options_object = {
    controllers: path.join(__dirname, './controllers'),
    checkControllers: true,
    loglevel: 'debug',
    logfile: 'logs.txt',
    ignoreUnknownFormats: false
}

oasTools.configure(options_object)

// Synchronize with DB
sequelize.sync({ force: env.api.cleanDbBeforeRun })
    .catch(() => {
        console.error("Unable to sync with DB, exiting with error code 2.")
        process.exit(2)
    })
    .then(() => fs.readFile(path.join(__dirname, '../init_db.sql'), 'utf-8', (err, sql) => {
        if (err) console.error(err)
        sequelize.query(sql).catch(() => console.warn("Unable to re-create triggers, skipping."))
    }))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())

oasTools.initialize(oasDoc, app, function () {

    if (env.api.enableTestMode) {
        console.warn("/!\\ TEST MODE IS ENABLED /!\\")
        app.get('/mynotes/reset', (req, res) => {
            sequelize.sync({ force: true }).then(() => res.sendStatus(200))
        })
    }

    http.createServer(app).listen(env.api.port, function () {
        console.log('Server is listening on port %d (http://localhost:%d)', env.api.port, env.api.port)
        console.log('Swagger-ui is available on http://localhost:%d/docs', env.api.port)
    })

})