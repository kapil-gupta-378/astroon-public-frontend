import React from 'react';
import styles from './textInput.module.scss';
const TextInput = ({
  title,
  placeHolder,
  kind,
  handleOnChange,
  handleValue,
}) => {
  return (
    <div className={styles.input_wrap}>
      <label className={styles.corner_border_label}>{title}</label>
      <input
        value={handleValue}
        onChange={handleOnChange}
        className={`${
          kind === 'cornerborder' ? styles.corner_border : styles.full_border
        }`}
        type="text"
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TextInput;
