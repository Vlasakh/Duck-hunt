import io from 'socket.io-client';
import { INIT_GAME, START_GAME } from '../../common/socketConstants';

export function useDuckHuntGame() {
  let socket;

  function startGame(startCallback) {
    if (!socket?.connected) {
      if (socket) {
        socket.connect();
      } else {
        socketInit(startCallback);
      }
    }
  }

  async function socketInit(startCallback) {
    await fetch('/api/duck-hunt');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
      socket.emit(INIT_GAME, 'init');
    });

    socket.on(START_GAME, () => {
      console.log('❗on start');
      startCallback();
    });
  }

  function stopGame() {
    if (socket?.connected) {
      socket.disconnect();
      socket = null;
    }
    console.log('❗socket', socket);
  }

  return {
    socket,
    startGame,
    stopGame,
  };
}
