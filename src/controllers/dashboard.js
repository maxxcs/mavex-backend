const ProjectModel = require('../models/project');
const { sign, verify } = require('../config/auth');

const dashboard = async (fast, opts, done) => {
  fast.post('/', async (request, reply) => {
    try {
      reply.type('application/json');

      const user = await verify(request.body.token);
      const projects = await ProjectModel.find({ 'owner.id': user.id });

      return { projects };

    } catch (err) {
      reply.code(400);
      console.error(err);
      return err;
    }
  });

  fast.post('/join-project', async (request, reply) => {
    try {
      reply.type('application/json');

      if (!request.body.projectId || !request.body.token)
        throw new Error('Badly formatted entries');

      const user = await verify(request.body.token);
      const project = await ProjectModel.findById(request.body.projectId);
      // console.log(user);

      if (project.owner.id === user.id) {
        return { project };
      } else {
        throw new Error('Not authorized');
      }

    } catch (err) {
      reply.code(400);
      console.error(err);
      return { message: err.message };
    }
  });

  fast.post('/create-project', async (request, reply) => {
    try {
      reply.type('application/json');

      if (!request.body.project || !request.body.token)
        throw new Error('Badly formatted entries');

      const user = await verify(request.body.token);
      let adminPrivileges = null;
      const submittedProject = {
        name: request.body.project.name,
        isPublic: request.body.project.isPublic,
        status: 1,
        owner: user,
        privilegeSchemas: [
          {
            name: 'admin',
            privileges: {
              admin: 100,
              files: {
                read: 100,
                write: 100,
                edit: 100
              },
              channels: {
                read: 100,
                write: 100,
                edit: 100
              },
              terminals: {
                read: 100,
                write: 100,
                edit: 100
              }
            }
          },
          {
            name: 'guest',
            privileges: {
              admin: 0,
              files: {
                read: request.body.project.usersFilesRead ? 1 : 0,
                write: request.body.project.usersFilesWrite ? 1 : 0,
                edit: request.body.project.usersFilesEdit ? 1 : 0
              },
              channels: {
                read: request.body.project.usersChannelsRead ? 1 : 0,
                write: request.body.project.usersChannelsWrite ? 1 : 0,
                edit: request.body.project.usersChannelsEdit ? 1 : 0
              },
              terminals: {
                read: request.body.project.usersTerminalsRead ? 1 : 0,
                write: request.body.project.usersTerminalsWrite ? 1 : 0,
                edit: request.body.project.usersTerminalsEdit ? 1 : 0
              }
            }
          }
        ],
        users: [],
        files: [],
        channels: [],
        terminals: []
      }
      const project = await ProjectModel.create(submittedProject);
      project.privilegeSchemas.forEach((value) => {
        if (value.name === 'admin')
          return adminPrivileges = value;
      });
      project.users.push({
        id: project.owner.id,
        username: project.owner.username,
        privilegeGroup: adminPrivileges
      });
      const projectUpdated = await project.save();

      return { created: true, project: projectUpdated };

    } catch (err) {
      reply.code(400);
      console.error(err);
      return { created: false, message: err.message };
    }
  });

  fast.post('/config-project', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'dashboard', location: 'index' };

    } catch (err) {
      reply.code(400);
      console.error(err);
      return err;
    }
  });

  fast.post('/remove-project', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'dashboard', location: 'index' };

    } catch (err) {
      reply.code(400);
      console.error(err);
      return err;
    }
  });


  done();
}

module.exports = dashboard;
