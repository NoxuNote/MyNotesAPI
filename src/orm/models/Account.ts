import { Model, Table, Column, PrimaryKey, Default, Unique } from "sequelize-typescript";
import { UUIDV4, UUID } from "sequelize";

@Table
export class Account extends Model<Account> {

    @PrimaryKey
    @Default(UUIDV4)
    @Column(UUID)
    accountUuid!: string

    @Unique
    @Column
    email!: string
    
    @Column
    updatedAt!: Date

    @Column
    createdAt!: Date

}