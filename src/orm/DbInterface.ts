import { Models, Sequelize, SequelizeStatic } from 'sequelize';

export interface DbInterface {
    sequelize: Sequelize;
    Sequelize: SequelizeStatic;
    models: Models;
}