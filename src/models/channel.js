const mongoose = require('../config/hard-database');

const ChannelSchema = new mongoose.Schema({

});

const ChannelModel = mongoose.model('Channel', ChannelSchema);

module.exports = ChannelModel;
