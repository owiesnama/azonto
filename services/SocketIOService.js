const socketClient = require('../libs/socket-io/socket_client');
const socketServer = require('../libs/socket-io/socket_server');
const UsersService = require('./UsersService');

class SocketIOService {
  newClient(userId) {
    return new Promise((resolve, reject) => {
      try {
        socketClient.newClientConnected(userId);
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  }

  broadcast(message) {
    return new Promise((resolve, reject) => {
      try {
        socketServer.broadcast(message);
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  }

  send(userId, message) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await new UsersService().findOne({
          user_id: userId
        });

        socketServer.sendNotification(user.socket_token, message);
        resolve();
      } catch (error) {
        reject(error);
      }
    })
  }
}

module.exports = SocketIOService;