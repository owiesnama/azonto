const socket = require('socket.io-client')('http://localhost:3001');
const colors = require('colors');

socket.on('connect', () => {
  exports.newClientConnected = (userId) => {
    console.log('new client connected');
    socket.emit('new_client', {
      userId: userId
    })
  }
});

socket.on('notification', (data) => {
  console.log('\ndata: '.green, JSON.stringify(data));
});

if (process.env.USER_ID) {
  console.log('new user from terminal'.yellow);

  socket.emit('new_client', {
    userId: process.env.USER_ID
  })
}