# Mavex API Service

# Routes

* /api/ - GET
* /api/login - POST
* /api/register - POST
* /api/logout - GET

* /api/dashboard - GET
* /api/dashboard/create-project - POST
* /api/dashboard/config-project - PUT
* /api/dashboard/remove-project - DELETE
* /api/dashboard/search?q={query} - GET
* /api/dashboard/user - GET
* /api/dashboard/user - POST

* /api/workspace/{projectId} - GET
* /api/workspace/{projectId}/file/{fileId} - GET
* /api/channels/{projectId} - GET 
* /api/channels/{projectId}/ch/{channelId} - GET
* /api/xves/{projectId} - GET
* /api/xves/{projectId}/ve/{xveId} - GET

#  In-memory Data Structure Store

```
user:{id}
project:{id}
file:{id}
channel:{id}
xve:{id}
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
    tags: [ String ]
}

Project {
    id: String,
    name: String,
    isListed: Boolean,
    isPrivate: Boolean,
    password: String,
    createdAt: Date,
    owner: {
        id: String,
        username: String
    },
    privilegeSchema: {
        general: {
            admin: Number,
            openProject: Number,
            closeProject: Number,
            userManagement: Number,
            console: Number,  
            xve: Number  
        },
        files: { 
            read: Number,
            write: Number,
            create: Number,
            remove: Number,
            cursor: Number
        },
        channels: {
            read: Number,
            write: Number,
            edit: Number,
            remove: Number
        }
    },
    users: [{
        id: String,
        username: String,
        privileges: {
            general: Number,
            files: Number,
            channels: Number
        },
        tags: [ String ]
    }],
    files: [{
        id: String,
        filename: String,
        extension: String,
        path: String
    }],
    channels: [],
    xves: [],
    tags: [ String ]
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
        remove: Number,
        cursor: Number
    },
    content: String,
    tags: [ String ],
    lastUpdate: Date
}

Channel {

}

Xve {

}
```
