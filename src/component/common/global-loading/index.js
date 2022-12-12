import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './globalLoading.module.scss';
const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoadingReducer);
  useEffect(() => {
    setLoading();
  }, [globalLoading]);

  const setLoading = async () => {
    if (globalLoading) {
      window.scrollTo(0, 0);
      document.body.classList.add('no_scroll_forLoading');
    } else {
      document.body.classList.remove('no_scroll_forLoading');
    }
  };
  return (
    <div id="globalLoading">
      {globalLoading && (
        <>
          <div className={styles.loader}>
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>

          <div className={styles.global_Loading_wrap}></div>
        </>
      )}
    </div>
  );
};

export default GlobalLoading;
