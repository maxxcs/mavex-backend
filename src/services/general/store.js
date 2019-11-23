const store = require('../../config/soft-database');

class GenenralStore {
  static addUserOnProject(projectId, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const project = await store.get(`project:${projectId}`);

        if (project) {
          const users = await store.smembers(`project:${projectId}:users`);
          users.push(user.id);
          await store.sadd(`project:${projectId}:users`, users);

          resolve();
        } else {
          //  create a project instance

          resolve();
        }

      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = GenenralStore;