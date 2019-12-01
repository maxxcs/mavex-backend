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

  static removeUser(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const userProjects = await store.keys(`project:*:user:${userId}`);
        const userFiles = await store.keys(`file:*:user:${userId}`);
        const itensToRemove = [...userFiles, ...userProjects]
        if (itensToRemove.length > 0)
          await store.del(itensToRemove);

        resolve();

      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = GenenralStore;