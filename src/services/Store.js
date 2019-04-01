const Redis = require('ioredis');
const store = new Redis();

class Store {
    static addUserOnFile(file, user) {
        return new Promise(async (resolve, reject) => {
            await store.sadd('file:5be3d14300ab840090de0352', user);
            resolve();
        });
    }

    static getUsersToBroadcastOnFile(file, sender) {
        return new Promise(async (resolve, reject) => {
            const users = await store.smembers('file:5be3d14300ab840090de0352');
            const usersToSend = users.filter(user => user !== sender);
            resolve(usersToSend);
        });
    }

    static removeUserFromFile(file, user) {
        return new Promise(async (resolve, reject) => {
            await store.srem('file:5be3d14300ab840090de0352', user);
            resolve();
        });
    }
}

module.exports = Store;
