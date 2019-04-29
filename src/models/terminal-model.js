const mongoose = require('../config/database');

const TerminalSchema = new mongoose.Schema({

});

const TerminalModel = mongoose.model('Terminal', TerminalSchema);

export default TerminalModel;
