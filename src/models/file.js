const mongoose = require('../config/hard-database');

const FileSchema = new mongoose.Schema({
  projectId: String,
  data: []
});

const FileModel = mongoose.model('File', FileSchema);

module.exports = FileModel;
