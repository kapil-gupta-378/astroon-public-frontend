import moment from 'moment/moment';
import Image from 'next/image';
import React from 'react';
import styles from './blogDetails.module.scss';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import { useRouter } from 'next/router';

const BlogDetail = ({ isAdmin, data, backBtn }) => {
  const route = useRouter();
  return (
    <div className={`container ${styles.blog_detail_wrap}`}>
      {backBtn && (
        <div onClick={() => route.back()} className={styles.header_left}>
          <Image
            src={backArrowIcon}
            width={20}
            height={20}
            alt="backarrow"
            layout="fixed"
            priority
          />
          <p>Back</p>
        </div>
      )}
      <h3 className={styles.blog_heading}>{data.title}</h3>
      <p className={styles.blog_date}>
        {moment(data.createdAt).format(' Do MMMM YYYY')}
      </p>
      <div
        className={isAdmin !== 'isAdmin' ? styles.blog_content : ''}
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
    </div>
  );
};

export default BlogDetail;
