import Sequelize from 'sequelize';
import { AccountFactory } from './models/Account';
import { DbInterface } from './DbInterface';
const env = require('../environment/environment.prod')

export function createModels(): DbInterface {
  const sequelize = new Sequelize(null, null, null, env.db)

  const db: DbInterface = {
    sequelize,
    Sequelize,
    models: {
        Account: AccountFactory(sequelize, Sequelize)
    } 
  };

  Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
      db.models[modelName].associate(db.models);
    }
  });

  return db;
};

const _db: DbInterface = createModels()
_db.sequelize.sync()

module.exports = _db