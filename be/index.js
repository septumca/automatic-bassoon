const { Server } = require("socket.io");

const io = new Server({
  connectTimeout: 5000,
  cors: {
    origin: "*",
    allowedHeaders: "*",
  }
});

let serverData = [];

io.on("connection", (socket) => {
  socket.on('joined', data => {
    console.info('joined', data);
    serverData = [...serverData, data];
    io.emit('player-list', serverData);
  });

  socket.on('disconnect', () => {
    console.info('disconnected', socket.id);
    serverData = serverData.filter(({id}) => id != socket.id);
    io.emit('player-list', serverData)
  });

  socket.on('score-updated', data => {
    console.info('score-updated', data);
    socket.broadcast.emit('score-updated', data);
  });
});

io.listen(3000);