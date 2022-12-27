import React from 'react';
import styles from './astroonProduct.module.scss';
const AstroonProduct = () => {
  const data = [
    { title: 'Animation' },
    { title: 'Token' },
    { title: 'NFT' },
    { title: 'App' },
    { title: 'Game' },
    { title: 'Game' },
  ];
  return (
    <div className={styles.astroon_products_wrap}>
      <h3 className={styles.astroon_products_heading}>ASTROON Product</h3>
      <div className={styles.products_content_wrap}>
        {data.map((data, idx) => {
          return (
            <div className={styles.card_wrap} key={idx}>
              <h3>{data.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AstroonProduct;
