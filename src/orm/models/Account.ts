import * as Sequelize from 'sequelize';

export interface AccountAttributes {
    accountUuid: string;
    email: string;
}

export interface AccountInstance extends Sequelize.Instance<AccountAttributes>, AccountAttributes { }

export const AccountFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes)
    : Sequelize.Model<AccountInstance, AccountAttributes> => {

        const attributes : Sequelize.DefineModelAttributes<AccountAttributes> = {
            accountUuid: {
                type: Sequelize.UUIDV4,
                defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: 'mail@example.com'
            }
        }

        const Account = sequelize.define<AccountInstance, AccountAttributes>('Account', attributes)

        return Account;
    }



// Account.hasMany(NoteMetadata,   { foreignKey: 'accountUuid' })
// Account.hasMany(NoteContent,    { foreignKey: 'accountUuid' })
