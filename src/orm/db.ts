import { Sequelize } from 'sequelize-typescript';
import { Account } from './models/Account';
import { NoteMetadata } from './models/NoteMetadata';
import { NoteContent } from './models/NoteContent';

console.log(`Using ${process.argv[2]} environment.`)
let env;
try {
    env = require(`../../environment/environment.${process.argv[2]}`)
} catch {
    throw new Error(`Cannot find '${process.argv[2]}' environment. Please create a 'environment/environment.${process.argv[2]}.ts' file.`)
}

export const sequelize = new Sequelize({
    ...env.db,
    models: [
        Account,
        NoteMetadata,
        NoteContent
    ]
})