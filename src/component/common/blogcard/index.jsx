import Image from 'next/image';
import React from 'react';
import styles from './blogcard.module.scss';
// import cardback from '../../../../public/assets/images/card_back.svg';
const BlogCard = () => {
  return (
    <div className={styles.blog_card_wrap}>
      <div className={styles.blog_card_img_wrap}>
        {/* <div className={styles.backgroud_blog_card}>
          <Image
            src={cardback}
            width={420}
            height={283}
            alt="img"
            layout="fixed"
          />
        </div> */}
        <div className={styles.img_blog_card}>
          <Image
            src={'/assets/images/blog_card.svg'}
            width={322}
            height={287}
            layout="fixed"
            alt="blog_card"
          />
        </div>
      </div>
      <div>
        <p>Co-Founder</p>
        <h4>Lorem Ipsum</h4>
      </div>
    </div>
  );
};

export default BlogCard;
