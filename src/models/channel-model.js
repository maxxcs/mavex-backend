const mongoose = require('../config/database');

const ChannelSchema = new mongoose.Schema({

});

const ChannelModel = mongoose.model('Channel', ChannelSchema);

export default ChannelModel;
