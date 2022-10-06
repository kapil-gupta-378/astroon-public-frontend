import Image from 'next/image';
import React from 'react';
import styles from './blogcard.module.scss';
// import cardback from '../../../../public/assets/images/card_back.svg';
const BlogCard = () => {
  return (
    <div className={styles.blog_card_wrap}>
      <div className={styles.blog_card_img_wrap}>
        <Image
          src={'/assets/images/blog_card.svg'}
          width={322}
          height={287}
          layout="fixed"
          alt="blog_card"
        />
      </div>
      <div className={styles.blog_card_text}>
        <p>NFT Trading</p>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing</h4>
      </div>
    </div>
  );
};

export default BlogCard;
