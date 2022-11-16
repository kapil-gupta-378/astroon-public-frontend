import React from 'react';
import styles from './globalLoading.module.scss';
const GlobalLoading = () => {
  return (
    <div className={styles.global_Loading_wrap}>
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default GlobalLoading;
