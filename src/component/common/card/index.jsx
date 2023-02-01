import Image from 'next/image';
import React from 'react';
import styles from './card.module.scss';
import cardback from '../../../../public/assets/images/card_back.svg';
const Card = ({ image, name, designation, socialHandle }) => {
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
            priority
          />
        </div>
        <div className={styles.img_card}>
          <Image
            src={image}
            width={322}
            height={287}
            layout="fixed"
            alt="card_avatar"
            priority
          />
        </div>
      </div>
      <div className={styles.text_wrap}>
        <h4>{name ? name : ''}</h4>
        <p className={styles.mid_heading}>{socialHandle ? socialHandle : ''}</p>
        <p>{designation ? designation : ''}</p>{' '}
      </div>
    </div>
  );
};

export default Card;
