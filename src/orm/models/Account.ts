import sequelize, { Sequelize, DataTypes, UUIDV4, STRING, Instance, DefineModelAttributes } from "sequelize";

export interface AccountAttributes {
    accountUuid: string;
    email: string;
}

export interface AccountInstance extends Instance<AccountAttributes>, AccountAttributes { }

export const AccountFactory = (sequelize: Sequelize, DataTypes: DataTypes)
    : sequelize.Model<AccountInstance, AccountAttributes> => {

        const attributes : DefineModelAttributes<AccountAttributes> = {
            accountUuid: {
                type: UUIDV4,
                defaultValue: UUIDV4 // Or Sequelize.UUIDV1
            },
            email: {
                type: STRING,
                defaultValue: 'mail@example.com'
            }
        }

        const Account = sequelize.define<AccountInstance, AccountAttributes>('Account', attributes)

        return Account;
    }



// Account.hasMany(NoteMetadata,   { foreignKey: 'accountUuid' })
// Account.hasMany(NoteContent,    { foreignKey: 'accountUuid' })
