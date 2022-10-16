import Image from 'next/image';
import React from 'react';
import styles from './sort.module.scss';
import asenIcon from '../../../../public/assets/images/asen.svg';
import desIcon from '../../../../public/assets/images/des.svg';
const Sort = ({ handleSorting, isSort }) => {
  return (
    <div>
      {isSort ? (
        <button className={styles.srt_btn} onClick={() => handleSorting('ASC')}>
          <Image
            src={desIcon}
            width={11}
            height={15}
            layout="fixed"
            alt="filter-icon"
          />
          Sort
        </button>
      ) : (
        <button
          className={styles.srt_btn}
          onClick={() => handleSorting('DESC')}
        >
          <Image
            src={asenIcon}
            width={11}
            height={15}
            layout="fixed"
            alt="filter-icon"
          />
          Sort
        </button>
      )}
    </div>
  );
};

export default Sort;
