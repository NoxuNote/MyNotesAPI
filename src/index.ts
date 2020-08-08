'use strict';

import { sequelize } from "./orm/db";
const env = require('./utils/environment')

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = env.api.port;

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, '/../../environment/api/openapi.yaml'), options);
expressAppConfig.addValidator();
var app = expressAppConfig.getApp();

sequelize.sync({force: env.api.cleanDbBeforeRun})

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

