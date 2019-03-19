const server = require('http').createServer();
const io = require('socket.io')(server);
const colors = require('colors');
const UsersService = require('../../services/UsersService');

io.on('connection', client => {
  const socketToken = client.id;
  console.log('c id:'.yellow, socketToken);

  client.on('new_client', async user => {

    await new UsersService().update({
      socket_token: socketToken
    }, {
      user_id: user.userId
    })
  });

  client.on('disconnect', () => {
    /* … */
  });

});

exports.sendNotification = (socketToken, message) => {
  console.log(`\nsending to a user with token: ${socketToken}`.yellow);
  try {
    io.sockets.connected[socketToken].emit('notification', {
      message: message
    });
  } catch (error) {
    console.log('\n------------------ Error ------------'.red, error);
  }
};

exports.broadcast = (message) => {
  io.sockets.emit('notification', {
    message: message
  });
};

server.listen(3001);