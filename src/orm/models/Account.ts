import { Model, Table, Column, PrimaryKey, Default, Unique, IsEmail, IsUUID, NotNull } from "sequelize-typescript";
import { UUIDV4, UUID } from "sequelize";

@Table
export class Account extends Model<Account> {

    @PrimaryKey
    @Default(UUIDV4)
    @Column(UUID)
    accountUuid!: string

    @Unique
    @NotNull
    @IsEmail
    @Column
    email!: string

    @Column
    nickname!: string
    
    @Column
    updatedAt!: Date

    @Column
    createdAt!: Date

}