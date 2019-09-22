const bcrypt = require('bcrypt');
const mongoose = require('../config/database');

const UserSchema = new mongoose.Schema({
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  projects: {
    type: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: String
    }]
  },
  notifications: {
    type: [{
      new: Boolean,
      read: Boolean,
      title: String,
      content: String,
      link: String,
      from: String,
      date: Date
    }]
  },
  editor: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  tags: {
    type: [String]
  },
  status: {
    type: Number
  }
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  });
}, function (err) {
  next(err);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return err;
  }
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
