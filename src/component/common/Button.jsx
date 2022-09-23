import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import axios from 'axios';
// import demo from '../../../public/demo.pdf';

const Button = ({ children, kind, ...rest }) => {
  const downloadFile = () => {
    axios
      .get(
        'https://www.tutorialspoint.com/website_development/website_development_tutorial.pdfd',
      )
      .then((response) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `FileName.pdf`);
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };

  return (
    <>
      {kind === 'download' ? (
        <div onClick={downloadFile} className={styles.download_btn}>
          {children}
        </div>
      ) : (
        <button
          className={`${
            kind === 'text'
              ? styles.normal_btn
              : kind === 'wallet-connect'
              ? styles.wallet_connect_btn
              : styles.link
          } }`}
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  kind: PropTypes.oneOf(['text', 'link', 'download', 'wallet-connect']),
};

Button.defaultProps = {
  kind: 'text',
};
export default Button;
