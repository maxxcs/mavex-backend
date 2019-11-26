const mongoose = require('../config/hard-database');

const FileSchema = new mongoose.Schema({
  projectId: String,
  filename: String,
  extension: String,
  path: String,
  permissions: {
    read: Number,
    write: Number,
    edit: Number
  },
  data: []
});

const FileModel = mongoose.model('File', FileSchema);

export default FileModel;
