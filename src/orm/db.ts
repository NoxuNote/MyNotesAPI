import { Sequelize } from 'sequelize-typescript';
import { Account } from './models/Account';
import { NoteMetadata } from './models/NoteMetadata';
import { NoteContent } from './models/NoteContent';

export const sequelize = new Sequelize({
        "dialect":"DB",
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DB,
    models: [
        Account,
        NoteMetadata,
        NoteContent
    ]
})