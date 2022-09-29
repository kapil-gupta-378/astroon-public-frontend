import Image from 'next/image';
import React from 'react';
import Card from '../../common/card';
import styles from './team.module.scss';
import cardBackIcon from '../../../../public/assets/images/forword_icon.svg';
import cardForwordIcon from '../../../../public/assets/images/backword_icon.svg';
const Team = () => {
  return (
    <div className={`container ${styles.team_wrap}`}>
      <h3 className={styles.team_heading}>Team</h3>
      <div className={styles.cards_wrap}>
        {[...Array(3).keys()].map((_, idx) => (
          <Card key={idx} />
        ))}
      </div>

      <div className={styles.card_navigation_btn}>
        <button className={styles.back_btn}>
          <Image
            src={cardForwordIcon}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
        <button className={styles.forword_btn}>
          <Image
            src={cardBackIcon}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
      </div>
    </div>
  );
};

export default Team;
