import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.scss';
// import axios from 'axios';

const Button = ({ children, kind, ...rest }) => {
  const downloadFile = () => {
    window.open(
      'https://astroon-prod-bucket.s3.ap-northeast-1.amazonaws.com/app/ASTROON+Whitepaper.pdf',
      '_blank',
    );
    // axios
    //   .get(
    //     'https://file-examples.com/storage/fe2879c03363c669a9ef954/2017/10/file-sample_150kB.pdf',
    //   )
    //   .then((response) => {
    //     // Create blob link to download
    //     const url = window.URL.createObjectURL(new Blob([response]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `FileName.pdf`);
    //     // Append to html link element page
    //     document.body.appendChild(link);
    //     // Start download
    //     link.click();
    //     // Clean up and remove the link
    //     link.parentNode.removeChild(link);
    //   });
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
              : kind === 'white_btn'
              ? styles.white_btn
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
  kind: PropTypes.oneOf([
    'text',
    'link',
    'download',
    'wallet-connect',
    'white_btn',
  ]),
};

Button.defaultProps = {
  kind: 'text',
};
export default Button;
