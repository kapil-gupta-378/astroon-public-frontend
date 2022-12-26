import Image from 'next/image';
import React from 'react';
import styles from './astroonHistory.module.scss';
import historyImage from '../../../../public/assets/images/nft_management.svg';

const AstroonHistory = () => {
  return (
    <div className={`container ${styles.astroon_history_wrap}`}>
      <h3 className={styles.astroon_history_heading}>ASTROON History</h3>
      <div className={styles.content_wrap}>
        <div className={styles.left_wrap}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            ratione suscipit culpa repudiandae, nesciunt recusandae sapiente
            delectus magni consequatur architecto, nulla commodi. Reiciendis nam
            culpa possimus, veniam minus officiis id! Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Et voluptatum a cumque, natus
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            ratione suscipit culpa repudiandae, nesciunt recusandae sapiente
            delectus magni consequatur architecto, nulla commodi. Reiciendis nam
            culpa possimus, veniam minus officiis id! Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Et voluptatum a cumque, natus
          </p>
        </div>

        <div className={styles.right_wrap}>
          <Image src={historyImage} layout="responsive" alt="historyimage" />
        </div>
      </div>
    </div>
  );
};

export default AstroonHistory;
