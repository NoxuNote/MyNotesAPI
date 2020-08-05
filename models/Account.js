const { Sequelize, DataTypes, Model }   = require('sequelize');
const seq                               = require('../utils/dbConnection');
const NoteMetadata = require('./NoteMetadata');
const NoteContent = require('./NoteContent');

const Account = seq.define('Account', {
    accountUuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: 'mail@example.com'
    }
  }, {
    // Other model options go here
});

Account.hasMany(NoteMetadata,   { foreignKey: 'accountUuid' })
Account.hasMany(NoteContent,    { foreignKey: 'accountUuid' })

module.exports = Account