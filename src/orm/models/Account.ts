import { Model, Table, Column, PrimaryKey, Default, Unique, IsEmail, Index, HasMany, AllowNull } from "sequelize-typescript";
import { UUIDV4, UUID, DataTypes } from "sequelize";
import { NoteMetadata } from "./NoteMetadata";

@Table
export class Account extends Model<Account> {

    @PrimaryKey
    @Default(UUIDV4)
    @Column(UUID)
    accountUuid!: string

    @Index({type: 'UNIQUE', using: 'BTREE', order: 'DESC'})
    @Unique
    @AllowNull(false)
    @IsEmail
    @Column
    email!: string

    @Column(DataTypes.STRING)
    nickname!: string
    
    @Column
    updatedAt!: Date

    @Column
    createdAt!: Date

    @HasMany(() => NoteMetadata)
    notes!: NoteMetadata[]

}