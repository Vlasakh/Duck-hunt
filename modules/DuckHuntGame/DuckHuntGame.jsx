import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { INIT_GAME, START_GAME } from '../../common/socketConstants';
import Canvas from './Canvas';
// import { makeStyles } from '@material-ui/core/styles';
import styles from './DuckHuntGame.module.css';
import { useDuckHuntGame } from './useDuckHuntGame';

export const DuckHuntGame = () => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <main className={styles.main}>
        {isClient && <Canvas />}
        {/*<Canvas />*/}

        {/*<Button variant={'contained'} onClick={startGame}>*/}
        {/*  Start game*/}
        {/*</Button>*/}
        {/*<p>*/}
        {/*  <Button variant={'contained'} onClick={handleMessage}>*/}
        {/*    Message*/}
        {/*  </Button>*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  <Button variant={'contained'} onClick={stopGame}>*/}
        {/*    Stop game*/}
        {/*  </Button>*/}
        {/*</p>*/}
      </main>

      <footer className={styles.footer}></footer>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      dehydratedState: {},
    },
  };
};
