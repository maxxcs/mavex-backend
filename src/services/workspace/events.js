const { sign, verify } = require('../../config/auth');
const ProjectModel = require('../../models/project');
const WorkspaceStore = require('./store');
const GenenralStore = require('../general/store');

module.exports = (primus, spark) => {

  spark.on('file:create', async ({ type, token, filename, actualNode, projectId }) => {
    try {
      token = await verify(token);
      const project = await ProjectModel.findById(projectId);
      const [user] = project.users.filter(user => user._id.toString() === token.id);
      console.log(type);
      const file = {
        filename,
        kind: type,
        permissions: user.privilegeGroup.privileges.files,
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
      console.log({ projectId, file, token });
      await WorkspaceStore.addUserOnFile(projectId, file.id, { id, username, socket: spark.id });
      spark.emit('file:userJoined');

    } catch (err) {
      console.error(err);
    }
  });

  spark.on('file:write', async data => {
    const users = await WorkspaceStore.getUsersToBroadcastOnFile(null, spark.id);
    primus.forward.sparks(users, { emit: ['file:userWrite', data] }, (err, result) => { });
  });

  spark.on('file:close', async data => {
    await WorkspaceStore.removeUserFromFile(null, spark.id);
    spark.emit('file:userLeft');
  });

};