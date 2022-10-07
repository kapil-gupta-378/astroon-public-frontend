import moment from 'moment/moment';
import React from 'react';
import styles from './blogDetails.module.scss';
const BlogDetail = ({ data }) => {
  return (
    <div className={`container ${styles.blog_detail_wrap}`}>
      <h3 className={styles.blog_heading}>{data.title}</h3>
      <p className={styles.blog_date}>
        {moment(data.createdAt).format(' Do MMMM YYYY')}
      </p>
      <div
        className={styles.blog_content}
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
    </div>
  );
};

export default BlogDetail;
