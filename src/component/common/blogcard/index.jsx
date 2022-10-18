import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './blogcard.module.scss';
// import cardback from '../../../../public/assets/images/card_back.svg';

const BlogCard = ({ data }) => {
  const router = useRouter();
  const myLoader = ({ src }) => {
    return `${src}`;
  };

  const gotoBlogDetailPage = (id) => {
    router.push(`blog-detail/${id}`);
  };
  return (
    <div
      onClick={() => gotoBlogDetailPage(data.id)}
      className={styles.blog_card_wrap}
    >
      <div className={styles.blog_card_img_wrap}>
        <Image
          loader={myLoader}
          src={data.featureImage}
          layout="responsive"
          width={322}
          height={217}
          alt="blog_card"
          unoptimized
        />
      </div>
      <div className={styles.blog_card_text}>
        <p>{`${data.title.substring(0, 30)}....`}</p>
        <h4>{`${data.metaDescription.substring(0, 46)}....`}</h4>
      </div>
    </div>
  );
};

export default BlogCard;
