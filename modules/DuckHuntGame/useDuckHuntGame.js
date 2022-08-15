import io from 'socket.io-client';
import { INPUT_CHANGE, START_GAME } from '../../common/socketConstants';

export function useDuckHuntGame() {
  let socket;

  function startGame() {
    if (!socket?.connected) {
      if (socket) {
        socket.connect();
      } else {
        new Promise((res) => {
          socketInit(res);
        });
      }
    }
  }

  async function socketInit(startCallback) {
    await fetch('/api/duck-hunt');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
      startCallback();
    });

    socket.on(START_GAME, (msg) => {
      console.log('❗msg', msg);
    });
  }

  function stopGame() {
    if (socket?.connected) {
      socket.disconnect();
      socket = null;
    }
    console.log('❗socket', socket);
  }

  function handleMessage(e) {
    socket.emit(INPUT_CHANGE, 'test');
    console.log('❗test', 'test');
  }

  return {
    socket,
    startGame,
    stopGame,
    handleMessage,
  };
}
