import React, { useRef, useState } from 'react';
import styles from './fileInput.module.scss';
import PropTypes from 'prop-types';

const FileInput = ({ title, titleBackground, inputOnChange }) => {
  const inputRef = useRef();
  const openInput = () => {
    inputRef.current.click();
  };
  const [fileName, setfileName] = useState('file Name');
  const uploadFile = (e) => {
    setfileName(e.target.files[0].name);
    inputOnChange(e);
  };
  return (
    <div className={styles.file_input_wrapper}>
      <label style={{ background: titleBackground }}>{title}</label>
      <input onChange={uploadFile} ref={inputRef} type="file" />
      <span>{fileName}</span>
      <button type="button" onClick={openInput}>
        Upload
      </button>
    </div>
  );
};

FileInput.propTypes = {
  title: PropTypes.string,
  inputOnChange: PropTypes.func,
  inputDiabled: PropTypes.bool,
};
FileInput.defaultProps = {
  inputDiabled: false,
  titleBackground: '#05052d',
};

export default FileInput;
