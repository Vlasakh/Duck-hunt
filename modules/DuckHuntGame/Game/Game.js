import { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import useSound from 'use-sound';
import Stats from '../Stats';
import { useDuckHuntSocket } from '../useDuckHuntSocket';
import styles from './Game.module.css';

const DUCK_SPRITE = '/duck_hunt_sprite.png';
const DUCK_FLIGHT_SOUND = '/quack-quack.mp3';
const DUCK_HIT_SOUND = '/awp.mp3';

const CANVAS_WIDTH = typeof window === 'undefined' ? 0 : window.innerWidth - 40;
const CANVAS_HEIGHT = typeof window === 'undefined' ? 0 : window.innerHeight - 220;

const Game = () => {
  const [isPlay, setPlay] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [duckHits, setDuckHits] = useState(0);
  const roundsRef = useRef(1);
  const duckHitsRef = useRef(0);
  const { startGame, stopGame, sendGameStats } = useDuckHuntSocket();

  const [duckQuackSnd, quackSndControls] = useSound(DUCK_FLIGHT_SOUND);
  const [awpSnd] = useSound(DUCK_HIT_SOUND);
  const sprite = useRef(new Image());

  const START_POINT = -70;
  const TIME_STEP = 10;
  const STEP = (CANVAS_WIDTH - START_POINT) / 500;
  const DUCK_WIDTH = 70;
  const DUCK_HEIGHT = 59;
  const FLY_FRAME_1 = 0;
  const FLY_FRAME_2 = 70;
  const HIT_FRAME = 140;
  const ROUND_TIME = 6;
  const MAX_ROUNDS = 5;
  const canvasRef = useRef(null);

  const moveInterval = useRef(null);
  const toggleFrameInterval = useRef(null);
  const roundTimer = useRef(null);
  const frame = useRef(null);
  let cursorX = 0;
  let cursorY = 0;
  let roundTime = ROUND_TIME;
  let x = useRef(START_POINT);
  let y = useRef(0);
  let isFirstFrame = true;

  const toggleFrame = () => {
    isFirstFrame = !isFirstFrame;
    frame.current = isFirstFrame ? FLY_FRAME_1 : FLY_FRAME_2;
  };

  const stopAnimation = () => {
    clearInterval(moveInterval.current);
    clearInterval(toggleFrameInterval.current);
  };

  const startAnimation = () => {
    toggleFrameInterval.current = setInterval(() => {
      toggleFrame();
    }, 200);

    moveInterval.current = setInterval(() => {
      x.current += STEP;

      const isDuckFinished = x.current >= CANVAS_WIDTH;
      if (isDuckFinished) {
        x.current = START_POINT;
        stopAnimation();

        sendGameStats({ rounds: roundsRef.current, duckHits: duckHitsRef.current });
      }
    }, TIME_STEP);
  };

  const startRound = () => {
    duckQuackSnd();
    y.current = Math.floor(Math.random() * (CANVAS_HEIGHT - DUCK_HEIGHT));
    render();

    startAnimation();
    roundTimer.current = setInterval(() => {
      roundTime -= 1;

      if (roundTime === 0) {
        roundTime = ROUND_TIME;
        roundsRef.current++;
        clearInterval(roundTimer.current);
        if (roundsRef.current <= MAX_ROUNDS) {
          setRounds((rounds) => rounds + 1);
          startRound();
        } else {
          finishGame();
        }
      }
    }, 1000);
  };

  const hitDuck = () => {
    const isDuckHit =
      x.current <= cursorX &&
      cursorX <= x.current + DUCK_WIDTH &&
      y.current <= cursorY &&
      cursorY <= y.current + DUCK_HEIGHT;

    if (isDuckHit) {
      stopAnimation();
      quackSndControls.stop();
      awpSnd();
      frame.current = HIT_FRAME;
      setDuckHits((duckHits) => duckHits + 1);
      duckHitsRef.current++;

      sendGameStats({ rounds: roundsRef.current, duckHits: duckHitsRef.current });

      setTimeout(() => {
        x.current = START_POINT;
      }, 1000);
    }
  };

  const render = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      sprite.current,
      frame.current,
      0,
      DUCK_WIDTH - 2,
      DUCK_HEIGHT,
      x.current,
      y.current,
      DUCK_WIDTH,
      DUCK_HEIGHT,
    );

    isPlay && requestAnimationFrame(render);
  };

  const finishGame = () => {
    x.current = START_POINT;
    setPlay(false);
    stopAnimation();
    quackSndControls.stop();
    clearInterval(roundTimer.current);
    stopGame();
  };

  const handleStartClick = () => {
    setRounds(1);
    setDuckHits(0);
    roundsRef.current = 1;
    duckHitsRef.current = 0;
    startGame(() => {
      setPlay(true);
    });
  };

  useEffect(() => {
    sprite.current.src = DUCK_SPRITE;

    return () => stopGame();
  }, []);

  useEffect(() => {
    isPlay && startRound();
  }, [isPlay]);

  return (
    <>
      <header className={styles.header}>
        <h1>Duck hunt</h1>
      </header>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        height={CANVAS_HEIGHT}
        width={CANVAS_WIDTH}
        onMouseMove={(event) => {
          cursorX = event.nativeEvent.offsetX;
          cursorY = event.nativeEvent.offsetY;
        }}
        onClick={() => hitDuck()}
      />
      <p>
        <Stats rounds={rounds} duckHits={duckHits} />
        {!isPlay ? (
          <Button color={'primary'} variant={'contained'} onClick={handleStartClick}>
            Start game
          </Button>
        ) : (
          <Button color={'secondary'} variant={'contained'} onClick={finishGame}>
            Finish the game
          </Button>
        )}
      </p>
    </>
  );
};

export default Game;
