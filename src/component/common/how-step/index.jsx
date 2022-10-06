import Image from 'next/image';
import React from 'react';
import workFlowImage from '../../../../public/assets/images/workflow.svg';
import styles from './howStep.module.scss';
const HowStep = ({ title }) => {
  return (
    <div className={styles.work_wrap}>
      <h3>{title}</h3>
      <div className={styles.work_image}>
        <Image src={workFlowImage} layout="responsive" alt="image work" />
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
