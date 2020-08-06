import { Model, Table, Column, PrimaryKey, Default, Unique } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";

@Table
export class Account extends Model<Account> {

    @PrimaryKey
    @Default(UUIDV4)
    @Column
    accountUuid!: string

    @Unique
    @Column
    email!: string

}