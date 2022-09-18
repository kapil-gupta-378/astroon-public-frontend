import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Button.module.scss"
// eslint-disable-next-line unused-imports/no-unused-vars
const Button = ({ children, kind, ...rest }) => {
  return <button className={`${kind === 'text' ? styles.normal_btn: kind=== 'download' ? styles.download_btn: kind === 'wallet-connect' ? styles.wallet_connect_btn: styles.link} }`} {...rest}>{children}</button>;
};

Button.propTypes = {
  kind: PropTypes.oneOf(['text', 'link', 'download', 'wallet-connect']),
};

Button.defaultProps = {
  kind: 'text',
};
export default Button;
