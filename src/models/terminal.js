const mongoose = require('../config/hard-database');

const TerminalSchema = new mongoose.Schema({

});

const TerminalModel = mongoose.model('Terminal', TerminalSchema);

module.exports = TerminalModel;
