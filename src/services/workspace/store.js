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

  static getSocketsToBroadcastOnFile(fileId, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        let sender = await store.get(`file:${fileId}:user:${userId}`);
        sender = JSON.parse(sender);
        if (!sender) reject('User not found');

        const list = await store.keys(`file:${fileId}:user:*`);
        const users = await store.mget(list);
        const sockets = users.map(user => {
          const { socket } = JSON.parse(user);
          return socket;
        });
        const socketsToSend = sockets.filter(socket => socket !== sender.socket);
        resolve(socketsToSend);

      } catch (err) {
        reject(err);
      }
    });
  }

  static removeUserFromFile(fileId, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        await store.del([`file:${fileId}:user:${userId}`]);
        resolve();

      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = WorkspaceStore;