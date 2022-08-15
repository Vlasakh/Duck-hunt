import { Server } from 'socket.io';
import { DUCK_HUNT_STATISTICS, INIT_GAME, START_GAME } from '../../common/socketConstants';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');

    const io = new Server(res.socket.server);

    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('❗connected');

      socket.on(INIT_GAME, (msg) => {
        console.log('❗msg', msg);
        setTimeout(() => socket.emit(START_GAME, 'run'), 1000);
      });

      socket.on(DUCK_HUNT_STATISTICS, (msg) => {
        console.log('❗game stats', JSON.parse(msg));
      });
    });
  }
  res.end();
};

export default SocketHandler;
