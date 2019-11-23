const mongoose = require('../config/hard-database');

const FileSchema = new mongoose.Schema({

});

const FileModel = mongoose.model('File', FileSchema);

export default FileModel;
