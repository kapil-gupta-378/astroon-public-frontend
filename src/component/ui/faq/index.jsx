import React from 'react';
import Accordion from '../../common/accordion';
import styles from './faq.module.scss';
const FAQ = () => {
  return (
    <div className={`container ${styles.faq_wrap}`}>
      <h3 className={styles.faq_heading}>FAQ</h3>
      <div className={styles.accordion_wrap}>
        <div className={styles.accordion_coloum}>
          {[...Array(3).keys()].map((item, idx) => (
            <Accordion key={idx} id={idx} />
          ))}
        </div>
        <div className={styles.accordion_coloum}>
          {[...Array(3).keys()].map((item, idx) => (
            <Accordion key={idx} id={`2${idx}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
