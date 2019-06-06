# Mavex API Service



# Routes

```
/api/ - GET
/api/login - POST
/api/register - POST
/api/logout - GET

/api/dashboard - GET
/api/dashboard/create-project - POST
/api/dashboard/config-project - PUT
/api/dashboard/remove-project - DELETE
/api/dashboard/search?q=:query - GET
/api/dashboard/user - GET
/api/dashboard/user - POST

/api/workspace/:projectId - GET
/api/workspace/:projectId/file/:fileId - GET
/api/channels/:projectId - GET 
/api/channels/:projectId/ch/:channelId - GET
/api/terminals/:projectId - GET
/api/terminals/:projectId}/mvx/:terminalId - GET
```

#  In-memory Data Structure Store

```
project:{id}
project:{id}:users
project:{id}:files
project:{id}:channels
project:{id}:terminals
user:{id}
file:{id}
file:{id}:users
channel:{id}
channel:{id}:users
terminal:{id}
```

# Database Schema

```
User {
    id: String,
    level: Number,
    username: String,
    email: String,
    password: String,
    projects: [ { ProjectInfo } ],
    notifications: [{
        new: Boolean,
        read: Boolean,
        title: String,
        content: String,
        link: String,
        from: String,
        date: Date
    }],
    editor: { config },
    createdAt: Date,
    lastLogin: Date,
    tags: [ String ],
    status: Number
}

Project {
    id: String,
    name: String,
    isPublic: Boolean,
    isLocked: Boolean,
    password: String,
    createdAt: Date,
    owner: {
        id: String,
        username: String
    },
    privilegeSchema: {
        admin: Number
        files: { 
            read: Number,
            write: Number,
            edit: Number
        },
        channels: {
            read: Number,
            write: Number,
            edit: Number
        },
        terminals: {
            read: Number,
            write: Number,
            edit: Number
        }
    },
    privilegeGroups: [{
      id: String,
      name: String,
      privileges: {
        admin: Number
        files: { 
            read: Number,
            write: Number,
            edit: Number
        },
        channels: {
            read: Number,
            write: Number,
            edit: Number
        },
        terminals: {
            read: Number,
            write: Number,
            edit: Number
        }
      }
    }],
    users: [{
        id: String,
        username: String,
        privilegeGroups: [{
          id: String,
          name: String
        }]
        tags: [ String ]
    }],
    files: [{
        id: String,
        filename: String,
        extension: String,
        path: String
    }],
    channels: [],
    terminals: [],
    tags: [ String ],
    status: Number
}

File {
    id: String,
    projectId: String,
    filename: String,
    extension: String,
    path: String,
    privileges: {
        read: Number,
        write: Number,
        edit: Number,
        remove: Number,
        cursor: Number
    },
    content: String,
    tags: [ String ],
    lastUpdate: Date,
    status: Number
}

Channel {

}

Terminal {

}
```
