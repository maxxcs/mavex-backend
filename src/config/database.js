const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/mavex';
const opt = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, opt);
mongoose.Promise = global.Promise;

module.exports = mongoose;
