const store = require('../../config/soft-database');

class WorkspaceStore {
  static addUserOnFile(projectId, fileId, { id, username, socket }) {
    return new Promise(async (resolve, reject) => {
      try {
        await store.set(`file:${fileId}:user:${id}`, JSON.stringify({
          projectId,
          username,
          socket
        }));
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

  static getSocketsToBroadcastOnFile(projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await store.keys(`project:${projectId}:user:*`);
        const users = await store.mget(list);
        const sockets = users.map(user => {
          const { socket } = JSON.parse(user);
          return socket;
        });
        resolve(sockets);

      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = WorkspaceStore;