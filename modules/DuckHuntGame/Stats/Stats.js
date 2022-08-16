import styles from './Stats.module.css';

const Stats = ({ rounds, duckHits }) => {
  return (
    <div className={styles.stats}>
      <p className={styles.stats__item}>
        rounds: {rounds} / duck hits: {duckHits}
      </p>
    </div>
  );
};

export default Stats;
