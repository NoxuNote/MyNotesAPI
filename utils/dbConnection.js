const Sequelize = require('sequelize')
const env       = require('../environment/environment.prod')

const seq = new Sequelize(null, null, null, env.db)

module.exports = seq
