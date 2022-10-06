import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../../component/common/blogcard';
import { fetchBlogData } from '../../redux/blog/blogAction';
import styles from './blog.module.scss';
import cardBackIcon from '../../../public/assets/images/forword_icon.svg';
import cardForwordIcon from '../../../public/assets/images/backword_icon.svg';
import { setBlogdataCount } from '../../redux/blog/blogSlice';
import HeadingBackground from '../../component/common/heading-background';
const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { blogData, blogLoading, blogCount } = useSelector(
    (state) => state.blogReducer,
  );
  useEffect(() => {
    let more = false;

    dispatch(fetchBlogData(currentPage, more));
  }, []);

  const fetchMoreblog = () => {
    let more = true;
    if (blogCount === 0 || blogCount >= 6) {
      dispatch(fetchBlogData(currentPage + 1, more));
      setCurrentPage(currentPage + 1);
      dispatch(setBlogdataCount(blogCount - 6));
    }
  };
  const fetchPreviousBlog = () => {
    if (currentPage > 1) {
      dispatch(fetchBlogData(currentPage - 1));
      setCurrentPage(currentPage - 1);
      dispatch(setBlogdataCount(blogCount + 6));
    }
  };
  return (
    <div className={`container ${styles.blog_wrap}`}>
      <HeadingBackground>
        <h3 className={styles.main_heading}>Blog</h3>
      </HeadingBackground>
      <div className={styles.blog_main_wrap}>
        {!blogLoading ? (
          blogData.length !== 0 ? (
            <div className={styles.blog_list_wrap}>
              {blogData.map((item, idx) => (
                <BlogCard data={item} key={idx} />
              ))}
            </div>
          ) : (
            <h3 className={styles.data_not_found}>Data Not Found</h3>
          )
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div className={styles.card_navigation_btn}>
        <button
          onClick={fetchPreviousBlog}
          className={` ${blogCount > 6 ? styles.back_btn : styles.forword_btn}`}
        >
          <Image
            src={cardForwordIcon}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
        <button
          onClick={fetchMoreblog}
          className={` ${blogCount < 6 ? styles.back_btn : styles.forword_btn}`}
        >
          <Image
            src={cardBackIcon}
            width={10}
            height={10}
            alt="btnback"
            layout="fixed"
          />
        </button>
      </div>
    </div>
  );
};

export default Blog;
