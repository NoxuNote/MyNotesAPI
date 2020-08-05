import { Optional, DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import { UUIDV4 } from 'sequelize';
import { sequelize } from "../db";

export interface AccountAttributes {
    accountUuid: string;
    email: string;
}

export interface AccountCreationAttributes extends Optional<AccountAttributes, "accountUuid"> {}

export class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountCreationAttributes {
    public accountUuid!: string;
    public email!: string;
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
console.log("Init Account")

Account.init(
    {
        accountUuid: {
            type: DataTypes.UUIDV4,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName: "accounts",
        sequelize // passing the `sequelize` instance is required
    }
)

Account.sync()

// Account.hasMany(NoteMetadata,   { foreignKey: 'accountUuid' })
// Account.hasMany(NoteContent,    { foreignKey: 'accountUuid' })
