import Image from 'next/image';
import React from 'react';
import styles from './blogFilter.module.scss';
import filerByIcon from '../../../../public/assets/images/filerByIcon.svg';

const BlogFilter = ({ handleFilter }) => {
  return (
    <div>
      <button className={styles.filter_btn} onClick={() => handleFilter()}>
        <Image
          src={filerByIcon}
          width={20}
          height={20}
          layout="fixed"
          alt="filter-icon"
        />
        Filter
      </button>
    </div>
  );
};

export default BlogFilter;
