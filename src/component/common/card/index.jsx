import Image from 'next/image';
import React from 'react';
import styles from './card.module.scss';
import cardback from '../../../../public/assets/images/card_back.svg';
const Card = () => {
  return (
    <div className={styles.card_wrap}>
      <div className={styles.card_img_wrap}>
        <div className={styles.backgroud_card}>
          <Image
            src={cardback}
            width={420}
            height={283}
            alt="img"
            layout="fixed"
          />
        </div>
        <div className={styles.img_card}>
          <Image
            src={'/images/card_avatar.svg'}
            width={322}
            height={287}
            layout="fixed"
            alt="card_avatar"
          />
        </div>
      </div>
      <h4>Lorem Ipsum</h4>
      <p>Co-Founder</p>
    </div>
  );
};

export default Card;
