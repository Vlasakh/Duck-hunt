import { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Stats from '../Stats';
import duckImage from '../sprites/duck_hunt_sprite.png';
import styles from './Canvas.module.css';

const CANVAS_WIDTH = typeof window === 'undefined' ? 0 : window.innerWidth - 40;
const CANVAS_HEIGHT = typeof window === 'undefined' ? 0 : window.innerHeight - 160;

const Canvas = () => {
  const [isPlay, setPlay] = useState(true);
  const [rounds, setRounds] = useState(0);
  const [duckHits, setDuckHits] = useState(0);

  const sprite = useRef(new Image());

  const START_POINT = -70;
  const TIME_STEP = 10;
  const STEP = (CANVAS_WIDTH - START_POINT) / 500;
  const DUCK_WIDTH = 70;
  const DUCK_HEIGHT = 59;
  const FLY_FRAME_1 = 0;
  const FLY_FRAME_2 = 70;
  const SHOT_FRAME = 140;
  const ROUND_TIME = 6;
  const canvasRef = useRef(null);

  let moveInterval = useRef(null);
  let toggleFrameInterval = useRef(null);
  let frame = useRef(null);
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
      }
    }, TIME_STEP);
  };

  const startRound = () => {
    setPlay(false);
    y.current = Math.floor(Math.random() * (CANVAS_HEIGHT - DUCK_HEIGHT));

    startAnimation();
    const roundTimer = setInterval(() => {
      roundTime -= 1;

      if (roundTime === 0) {
        roundTime = ROUND_TIME;
        setRounds((rounds) => rounds + 1);
        startRound();
        clearInterval(roundTimer);
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
      frame.current = SHOT_FRAME;
      setDuckHits((duckHits) => duckHits + 1);

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

    requestAnimationFrame(render);
  };

  useEffect(() => {
    sprite.current.src = '/duck_hunt_sprite.png';

    render();
  }, []);

  return (
    <>
      <canvas
        className={styles.Canvas}
        ref={canvasRef}
        height={CANVAS_HEIGHT}
        width={CANVAS_WIDTH}
        onMouseMove={(event) => {
          cursorX = event.nativeEvent.offsetX;
          cursorY = event.nativeEvent.offsetY;
        }}
        onClick={() => hitDuck()}
      />
      <Stats rounds={rounds} duckHits={duckHits} />
      {isPlay ? (
        <Button variant={'contained'} onClick={startRound}>
          Start game
        </Button>
      ) : (
        <Button
          variant={'contained'}
          onClick={() => {
            console.log('finish the game');
          }}
        >
          Finish the game
        </Button>
      )}
    </>
  );
};

export default Canvas;
