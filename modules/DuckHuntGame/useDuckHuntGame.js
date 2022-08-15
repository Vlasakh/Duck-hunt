import { useRef } from 'react';
import io from 'socket.io-client';
import { DUCK_HUNT_STATISTICS, INIT_GAME, START_GAME } from '../../common/socketConstants';

export function useDuckHuntGame() {
  const socket = useRef();

  function startGame(startCallback) {
    if (!socket.current?.connected) {
      if (socket.current) {
        socket.current.connect();
      } else {
        socketInit(startCallback);
      }
    }
  }

  async function socketInit(startCallback) {
    await fetch('/api/duck-hunt');
    socket.current = io();

    socket.current.on('connect', () => {
      console.log('connected');
      socket.current.emit(INIT_GAME, 'init');
    });

    socket.current.on(START_GAME, () => {
      console.log('❗on start');
      startCallback();
    });
  }

  function stopGame() {
    if (socket.current?.connected) {
      socket.current.disconnect();
      socket.current = null;
    }
    console.log('❗socket.current', socket.current);
  }

  function sendGameStats(stats) {
    socket.current.emit(DUCK_HUNT_STATISTICS, JSON.stringify(stats));
  }

  return {
    socket,
    startGame,
    stopGame,
    sendGameStats,
  };
}
