'use strict';

import { Application } from "express";
import { sequelize } from "./orm/db";

const env       = require('./utils/environment')
const path      = require('path');
const http      = require('http');
const oas3Tools = require('oas3-tools');

// swaggerRouter configuration
const options = {
    controllers: path.join(__dirname, './controllers')
};
const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, '../environment/api/openapi.yaml'), options);
const app: Application = expressAppConfig.getApp();

// Synchronize with DB
sequelize.sync({force: env.api.cleanDbBeforeRun})

// Redirect base paths to /docs
app.get(['/', '/mynotes'], (req, res) => res.redirect('/docs'))

if (env.api.enableTestMode) {
    console.warn("/!\\ TEST MODE IS ENABLED /!\\")
    app.get('/mynotes/reset', (req, res) => {
        sequelize.sync({ force: true }).then(() => res.sendStatus(200))
    })
}

// Initialize the Swagger middleware
http.createServer(app).listen(env.api.port, function () {
    console.log('Server is listening on port %d (http://localhost:%d)', env.api.port, env.api.port);
    console.log('Swagger-ui is available on http://localhost:%d/docs', env.api.port);
});

