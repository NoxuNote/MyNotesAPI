const { Sequelize, DataTypes, Model }   = require('sequelize');
const seq                               = require('../utils/dbConnection')

const NoteContent = seq.define('NoteContent', {
    noteUuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
    },
    content: {
        type: DataTypes.TEXT,
        defaultValue: ''
    }
  }, {
    // Other model options go here
});

NoteContent.belongsTo(Account, { foreignKey: 'accountUuid' })

module.exports = NoteContent