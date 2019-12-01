const { sign, verify } = require('../../config/auth');
const ProjectModel = require('../../models/project');
const FileModel = require('../../models/file');
const WorkspaceStore = require('./store');
const GenenralStore = require('../general/store');

module.exports = (primus, spark) => {

  spark.on('file:create', async ({ type, token, filename, actualNode, projectId }) => {
    try {
      token = await verify(token);
      const project = await ProjectModel.findById(projectId);
      const [user] = project.users.filter(user => user._id.toString() === token.id);
      let permissions = {};
      if (user) {
        permissions = user.privilegeGroup.privileges.files;
      } else {
        permissions = project.privilegeSchemas[1].privileges.files
      }

      const file = {
        filename,
        permissions,
        kind: type,
        children: [],
        data: []
      };

      if (actualNode) {
        if (actualNode.children) {
          file.parent = actualNode.id;
        } else {
          file.parent = actualNode.parent;
        }
      } else {
        file.parent = null;
      }

      project.files.push(file);
      const projectUpdated = await project.save();

      await FileModel.create({
        projectId,
        _id: projectUpdated.files[projectUpdated.files.length - 1]._id,
        data: []
      });

      const sockets = await GenenralStore.getSocketsToBroadcastOnProject(projectId);
      primus.forward.sparks(sockets, { emit: ['file:created', { files: projectUpdated.files }] }, (err, result) => { });

    } catch (err) {
      console.error(err);
    }
  });

  spark.on('file:delete', async data => {

    spark.emit('file:deleted');
  });

  spark.on('file:open', async ({ projectId, file, token }) => {
    try {
      const { id, username } = await verify(token);
      await WorkspaceStore.addUserOnFile(projectId, file.id, { id, username, socket: spark.id });

      const users = await WorkspaceStore.getSocketsToBroadcastOnFile(file.id, id);
      primus.forward.sparks(users, { emit: ['file:userJoined', username] }, (err, result) => { });

      const persistedFile = await FileModel.findById(file.id);
      spark.emit('file:data', persistedFile.data);

    } catch (err) {
      console.error(err);
    }
  });

  spark.on('file:write', async ({ change, fileId }) => {
    try {
      if (change.op) {
        const users = await WorkspaceStore.getSocketsToBroadcastOnFile(fileId, change.op.replica);
        primus.forward.sparks(users, { emit: ['file:userWrite', change] }, (err, result) => { });

        const persistedFile = await FileModel.findById(fileId);
        persistedFile.data.push(change);
        await persistedFile.save();
      }
    } catch (err) {
      console.error(err);
    }
  });

  spark.on('file:close', async ({ fileId, token }) => {
    try {
      const { id } = await verify(token);
      await WorkspaceStore.removeUserFromFile(fileId, id);
      spark.emit('file:userLeft');
    } catch (err) {
      console.error(er);
    }
  });

};
