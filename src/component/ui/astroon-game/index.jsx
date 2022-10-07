import React from 'react';
import GameCard from '../../common/game-card';
import styles from './astroon.module.scss';

const Astroon = () => {
  return (
    <div className={styles.astroon_wrp}>
      <div className={styles.astroon_content}>
        <h3>Astroon Game</h3>
        <p>Play astroon game and earn rewards</p>
        <div className={styles.astroon_content_position}>
          {[...Array(3).keys()].map((_, idx) => (
            <GameCard key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Astroon;
