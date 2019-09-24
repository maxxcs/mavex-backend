# Mavex API Service

# Routes

```
/ - GET
/login - POST
/register - POST
/logout - GET

/dashboard - GET
/dashboard/create-project - POST
/dashboard/config-project - PUT
/dashboard/remove-project - DELETE

/workspace/:projectId - GET
/workspace/:projectId/file/:fileId - GET

/channels/:projectId - GET 
/channels/:projectId/ch/:channelId - GET

/terminals/:projectId - GET
/terminals/:projectId}/mvx/:terminalId - GET
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

