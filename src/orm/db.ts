import { Sequelize } from 'sequelize-typescript';
import { Account } from './models/Account';
const env = require('../../environment/environment.prod')

export const sequelize = new Sequelize({
    ...env.db,
    models: [
        Account
    ]
})