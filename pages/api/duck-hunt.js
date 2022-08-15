import { Server } from 'socket.io';
import { BROADCAST_TEST, INPUT_CHANGE, START_GAME } from '../../common/socketConstants';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');

    const io = new Server(res.socket.server);

    res.socket.server.io = io;

    io.on('connection', (socket) => {
      setTimeout(() => socket.broadcast.emit(BROADCAST_TEST, 'client connected :)'), 1000);
      console.log('❗connected');

      socket.on(INPUT_CHANGE, (msg) => {
        // socket.broadcast.emit('update-input', msg)
        console.log('❗msg', msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
