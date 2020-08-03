const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

module.exports = new mongoose.Schema({
    account_uuid: { type: String, ref: 'Account' },
    permissions: [
        {
            account_uuid: {
                type: String, 
                ref: 'Account'
            },
            role: String
        }
    ],
    noteMetadata: {
        uuid: { type: String, default: uuidv4 },
        title:  { type: String, default: "New online note" },
        description: String,
        author: String,
        lastedit: { type: Date, default: Date.now },
        version: { type: Number, default: 1 },
        data: { type: Map, default: {} }
    },
    note: String
})