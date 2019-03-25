## ROUTES ##

api/ #GET
api/login #POST
api/register #POST
api/logout #GET
api/dashboard #GET
api/dashboard/create-project #POST
api/dashboard/config-project #PUT
api/dashboard/remove-project #DELETE
api/workspace/p/{projectId} #GET
api/channels/p/{projectId} #GET 
api/xve/p/{projectId} #GET

## DATABASE ##

User {
    id: String,
    level: Number,
    username: String,
    email: String,
    password: String,
    projects: [ { ProjectInfo } ],
    groups: [ { GroupInfo } ],
    xves: [ { XvesInfo } ],
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
    privilegeBase: {
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
    }
    users: [{
        id: String,
        username: String,
        privileges: {
            general: Number,
            files: Number,
            channels: Number
        },
        tags: [ String ]
    }]
    tags: [ String ]
}

File {
    id: String,
    projectId: String,
    filename: String,
    extension: String,
    dir: String,
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
