const mongoose = require('mongoose');
const addSoftDeleteHook = require('../utils/softDelete');

const tableSchema = new mongoose.Schema({
    number: {type: Number, required: true},
    qrCodeUrl: {type: String},
    isOccupied: {type: Boolean, default: false},
    deleted: {type: Boolean, default: false}
}, {
    timestamps: true
})



addSoftDeleteHook(tableSchema);

const Table = mongoose.model("Table",tableSchema)

module.exports = Table;