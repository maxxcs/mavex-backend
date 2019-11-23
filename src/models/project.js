const mongoose = require('../config/hard-database');

const PrivilegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  privileges: {
    admin: Number,
    files: {
      read: Number,
      write: Number,
      edit: Number
    },
    channels: {
      read: Number,
      write: Number,
      edit: Number
    },
    terminals: {
      read: Number,
      write: Number,
      edit: Number
    }
  }
});

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String
  },
  isPublic: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [String]
  },
  status: {
    type: Number
  },
  owner: {
    type: {
      id: String,
      username: String,
      email: String,
      permission: String
    }
  },
  privilegeSchemas: {
    type: [PrivilegeSchema]
  },
  users: {
    type: [
      {
        id: String,
        username: String,
        privilegeGroup: PrivilegeSchema
      }
    ]
  },
  files: {
    type: [
      {
        id: String,
        filename: String,
        extension: String,
        path: String,
        permissions: {
          read: Number,
          write: Number,
          edit: Number
        }
      }
    ]
  },
  channels: {
    type: [
      {
        id: String,
        name: String,
        type: Number,
        permissions: {
          read: Number,
          write: Number,
          edit: Number
        }
      }
    ]
  },
  terminals: {
    type: [
      {
        id: String,
        name: String,
        type: Number,
        permissions: {
          read: Number,
          write: Number,
          edit: Number
        }
      }
    ]
  }
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;
