import React from 'react';
import Accordion from '../../common/accordion';
import styles from './faq.module.scss';
const FAQ = () => {
  return (
    <div className={styles.FAQ_wrapper}>
      <div className={`container ${styles.faq_wrap}`}>
        <Accordion />
      </div>
    </div>
  );
};

export default FAQ;
