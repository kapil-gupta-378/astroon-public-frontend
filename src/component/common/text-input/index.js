import React from 'react';
import styles from './textInput.module.scss';
const TextInput = ({
  title,
  placeHolder,
  kind,
  handleOnChange,
  handleValue,
  handleType,
}) => {
  return (
    <div className={styles.input_wrap}>
      <label className={styles.corner_border_label}>{title}</label>
      <input
        type={handleType}
        value={handleValue}
        onChange={handleOnChange}
        className={`${
          kind === 'cornerborder' ? styles.corner_border : styles.full_border
        }`}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TextInput;
