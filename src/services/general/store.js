const store = require('../../config/soft-database');
const ProjectModel = require('../../models/project');

class GenenralStore {
  static getSocketsToBroadcastOnProject(projectId) {
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

  static addUserOnProject(projectId, { id, username, socket }) {
    return new Promise(async (resolve, reject) => {
      try {
        await store.set(`project:${projectId}:user:${id}`, JSON.stringify({ username, socket }));
        resolve();

      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = GenenralStore;