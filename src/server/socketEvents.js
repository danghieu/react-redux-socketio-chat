exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connect: ', socket.id);
    // socket.join('Lobby');
    socket.on('chat mounted', function(user) {
      // TODO: Does the server need to know the user?
      socket.emit('receive socket', socket.id)
    })
    socket.on('leave channel', function(channel) {
      console.log('leave channel', channel);
      if (channel == null) {
        return;
    } 
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      console.log('join channel', channel);
      socket.join(channel.name)
    })
    socket.on('new message', function(msg) {
      console.log('new message: ', msg);
      // socket.to(msg.channel).emit('new bc message', msg);
      io.sockets.in(msg.channel).emit('new bc message', msg);
      // socket.broadcast.emit('new bc message', msg);
    });
    socket.on('new channel', function(channel) {
      socket.broadcast.emit('new channel', channel)
    });
    socket.on('typing', function (data) {
      socket.broadcast.to(data.channel).emit('typing bc', data.user);
    });
    socket.on('stop typing', function (data) {
      socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
    });
    socket.on('new private channel', function(socketID, channel) {
      socket.broadcast.to(socketID).emit('receive private channel', channel);
    })
  });
}
