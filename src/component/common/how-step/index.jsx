import Image from 'next/image';
import React from 'react';
import workFlowDesktopImage from '../../../../public/assets/images/workflow.svg';
import workFlowMobileImage from '../../../../public/assets/images/workmobileflow.svg';
import styles from './howStep.module.scss';
const HowStep = ({ title }) => {
  return (
    <div className={styles.work_wrap}>
      <h3>{title}</h3>
      <div className={styles.work_image}>
        <Image
          src={workFlowDesktopImage}
          layout="responsive"
          alt="image work"
        />
      </div>
      <div className={styles.mobile_work_image}>
        <Image
          src={workFlowMobileImage}
          layout="responsive"
          alt="image work"
          className={styles.mobile_image}
        />
      </div>
      <p className={styles.earn_text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet feugiat
        nunc ornare adipiscing aenean ipsum pretium eu arcu. Aenean aliquam
        integer
      </p>
      <p className={styles.learn_text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet feugiat
        nunc ornare adipiscing aenean ipsum pretium eu arcu. Aenean aliquam
        integer
      </p>
      <p className={styles.shop_text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet feugiat
        nunc ornare adipiscing aenean ipsum pretium eu arcu. Aenean aliquam
        integer
      </p>
      <p className={styles.trade_text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet feugiat
        nunc ornare adipiscing aenean ipsum pretium eu arcu. Aenean aliquam
        integer
      </p>
    </div>
  );
};

export default HowStep;
