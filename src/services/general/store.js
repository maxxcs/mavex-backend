const store = require('../../config/soft-database');
const ProjectModel = require('../../models/project');

class GenenralStore {
  static openProject(projectId) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve();

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