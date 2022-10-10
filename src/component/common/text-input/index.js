import React from 'react';
import styles from './textInput.module.scss';
import PropTypes from 'prop-types';
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

TextInput.propTypes = {
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  kind: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleType: PropTypes.string,
};
TextInput.defaultProps = {
  title: 'text',
  kind: 'fullborder',
};

export default TextInput;
