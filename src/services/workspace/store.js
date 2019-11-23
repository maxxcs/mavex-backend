const store = require('../../config/soft-database');

class WorkspaceStore {
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
}

module.exports = WorkspaceStore;