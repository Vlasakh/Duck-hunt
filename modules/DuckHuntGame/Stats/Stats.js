import styles from './Stats.module.css';

const Stats = ({ rounds, duckHits }) => {
  return (
    <div className={styles.Stats}>
      <p className={styles.Stats__item}>
        rounds: {rounds} / duck hits: {duckHits}
      </p>
    </div>
  );
};

export default Stats;
