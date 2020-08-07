import { Sequelize } from 'sequelize-typescript';
import { Account } from './models/Account';
import { NoteMetadata } from './models/NoteMetadata';
import { NoteContent } from './models/NoteContent';

const env = require(`../../environment/environment.${process.argv[2]}`)
console.log(`Using ${process.argv[2]} environment.`)

export const sequelize = new Sequelize({
    ...env.db,
    models: [
        Account,
        NoteMetadata,
        NoteContent
    ]
})