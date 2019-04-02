const Redis = require('ioredis');
const store = new Redis();

class Store {
  static getFileContent(file) {
    return new Promise(async (resolve, reject) => {
      const content = await store.hget('file:5be3d14300ab840090de0352', 'content');
      resolve(content);
    });
  }

  static setFileContent(file, content) {
    return new Promise(async (resolve, reject) => {
      await store.hset('file:5be3d14300ab840090de0352', 'content', content);
      resolve();
    });
  }

  static addUserOnFile(file, user) {
    return new Promise(async (resolve, reject) => {
      await store.sadd('file:5be3d14300ab840090de0352:users', user);
      resolve();
    });
  }

  static getUsersToBroadcastOnFile(file, sender) {
    return new Promise(async (resolve, reject) => {
      const users = await store.smembers('file:5be3d14300ab840090de0352:users');
      const usersToSend = users.filter(user => user !== sender);
      resolve(usersToSend);
    });
  }

  static removeUserFromFile(file, user) {
    return new Promise(async (resolve, reject) => {
      await store.srem('file:5be3d14300ab840090de0352:users', user);
      resolve();
    });
  }
}

module.exports = Store;
