const { Sequelize, DataTypes, Model }   = require('sequelize');
const seq                               = require('../utils/dbConnection');
const Account = require('./account');

const NoteMetadata = seq.define('NoteMetadata', {
    noteUuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
    },
    title: {
        type: DataTypes.STRING,
        defaultValue: 'My note'
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: 'My note'
    }
  }, {
    // Other model options go here
});

NoteMetadata.belongsTo(Account, { foreignKey: 'accountUuid' })

module.exports = NoteMetadata