import { Sequelize } from 'sequelize-typescript';
import { Account } from './models/Account';
import { NoteMetadata } from './models/NoteMetadata';
import { NoteContent } from './models/NoteContent';

export const sequelize = new Sequelize({
        "dialect":"postgres",
        "host":"postgres",
        "port":5432,
        "username":process.env.POSTGRES_USER,
        "password":process.env.POSTGRES_PASSWORD,
        "database":process.env.POSTGRES_DB,
    models: [
        Account,
        NoteMetadata,
        NoteContent
    ]
})