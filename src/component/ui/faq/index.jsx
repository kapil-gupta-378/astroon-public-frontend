import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogData } from '../../../redux/blog/blogAction';
import { fetchFaqData } from '../../../redux/faq/faqAction';
import Accordion from '../../common/accordion';
import styles from './faq.module.scss';
const FAQ = () => {
  const [half, setHalf] = useState(0);
  const dispatch = useDispatch();
  const faqData = useSelector((state) => state.faqReducer.data);
  useEffect(() => {
    dispatch(fetchFaqData());
    dispatch(fetchBlogData());
  }, []);

  useEffect(() => {
    const half = Math.ceil(faqData.length / 2);
    setHalf(half);
  }, [faqData]);

  return (
    <div className={`container ${styles.faq_wrap}`}>
      <h3 className={styles.faq_heading}>FAQ</h3>
      <div className={styles.accordion_wrap}>
        {faqData.length !== 0 && (
          <>
            <div className={styles.accordion_coloum}>
              {faqData.slice(0, half).map((item, idx) => (
                <Accordion key={idx} id={idx} data={item} />
              ))}
            </div>
            <div className={styles.accordion_coloum}>
              {faqData.slice(half).map((item, idx) => (
                <Accordion key={idx} id={`2${idx}`} data={item} />
              ))}
            </div>
          </>
        )}
      </div>
      {faqData.length === 0 && (
        <p className={styles.data_not_found}>Data not found</p>
      )}
    </div>
  );
};

export default FAQ;
