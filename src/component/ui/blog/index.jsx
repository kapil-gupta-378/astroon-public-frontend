import React from 'react';
import BlogCard from '../../common/blogcard';
import Button from '../../common/button';
import styles from './blog.module.scss';

const Blog = () => {
  return (
    <div className={`container ${styles.blog_wrap}`}>
      <h3 className={styles.blog_heading}>Blog</h3>
      <div className={styles.blog_cards_wrap}>
        {[...Array(3).keys()].map((_, idx) => (
          <BlogCard key={idx} />
        ))}
      </div>
      <div className={styles.view_all_btn}>
        <Button kind="text">View All</Button>
      </div>
    </div>
  );
};

export default Blog;
