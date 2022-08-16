import { useEffect, useState } from 'react';
import styles from './Container.module.css';
import Game from './Game';

export const Container = () => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <main className={styles.main}>{isClient && <Game />}</main>
    </>
  );
};
