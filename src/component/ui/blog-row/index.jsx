import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogData } from '../../../redux/blog/blogAction';
import BlogCard from '../../common/blogcard';
import Button from '../../common/button';
import styles from './blog.module.scss';

const BlogRow = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { blogData } = useSelector((state) => state.blogReducer);
  useEffect(() => {
    dispatch(fetchBlogData());
  }, []);
  const gotoBlogpage = () => {
    router.push('/blog');
  };
  return (
    <div className={`container ${styles.blog_wrap}`}>
      <h3 className={styles.blog_heading}>Blog</h3>
      <div className={styles.blog_cards_wrap}>
        {blogData.slice(0, 3).map((item, idx) => (
          <BlogCard data={item} key={idx} />
        ))}
      </div>
      <div className={styles.view_all_btn}>
        <Button onClick={gotoBlogpage} kind="text">
          View All
        </Button>
      </div>
    </div>
  );
};

export default BlogRow;
