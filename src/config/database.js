const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/mavex';
const opt = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(uri, opt);
mongoose.Promise = global.Promise;

module.exports = mongoose;
