import { Sequelize } from 'sequelize';
const env = require('../environment/environment.prod')

export const sequelize = new Sequelize(null, null, null, env.db)