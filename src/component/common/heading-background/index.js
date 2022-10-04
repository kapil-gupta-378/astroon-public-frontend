import React from 'react';
import styles from './headingBackground.module.scss';
const HeadingBackground = ({ children }) => {
  return <div className={styles.ast_heading_back}>{children}</div>;
};

export default HeadingBackground;
