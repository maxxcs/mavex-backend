const Redis = require('ioredis');
const store = new Redis();

class Store {
  static getFileContent(file) {
    return new Promise(async (resolve, reject) => {
      try {
        const content = await store.hget('file:5be3d14300ab840090de0352', 'content');
        resolve(content);

      } catch (err) {
        reject(err);
      }
    });
  }

  static setFileContent(file, content) {
    return new Promise(async (resolve, reject) => {
      try {
        await store.hset('file:5be3d14300ab840090de0352', 'content', content);
        resolve();

      } catch (err) {
        reject(err);
      }
    });
  }

  static addUserOnFile(file, user) {
    return new Promise(async (resolve, reject) => {
      try {
        await store.sadd('file:5be3d14300ab840090de0352:users', user);
        resolve();

      } catch (err) {
        reject(err);
      }
    });
  }

  static getUsersToBroadcastOnFile(file, sender) {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await store.smembers('file:5be3d14300ab840090de0352:users');
        const usersToSend = users.filter(user => user !== sender);
        resolve(usersToSend);

      } catch (err) {
        reject(err);
      }
    });
  }

  static removeUserFromFile(file, user) {
    return new Promise(async (resolve, reject) => {
      try {
        await store.srem('file:5be3d14300ab840090de0352:users', user);
        resolve();

      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Store;
