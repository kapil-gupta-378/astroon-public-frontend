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
  inputDiabled,
  titleBackground,
  inputHeight,
  textarea,
  isRequired,
  handleName,
}) => {
  return (
    <div className={styles.input_wrap}>
      {title && (
        <label
          style={{ background: titleBackground }}
          className={styles.corner_border_label}
        >
          {title}
        </label>
      )}
      {textarea ? (
        <textarea
          name={handleName}
          required={isRequired}
          style={{ height: inputHeight }}
          disabled={inputDiabled}
          type={handleType}
          value={handleValue}
          onChange={handleOnChange}
          className={`${
            kind === 'cornerborder' ? styles.corner_border : styles.full_border
          }`}
          placeholder={placeHolder}
        />
      ) : (
        <input
          name={handleName}
          required={isRequired}
          style={{ height: inputHeight }}
          disabled={inputDiabled}
          type={handleType}
          value={handleValue}
          onChange={handleOnChange}
          className={`${
            kind === 'cornerborder' ? styles.corner_border : styles.full_border
          }`}
          placeholder={placeHolder}
        />
      )}
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  kind: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleType: PropTypes.string,
  inputDiabled: PropTypes.bool,
  height: PropTypes.string,
  ElementName: PropTypes.string,
  textarea: PropTypes.bool,
  isRequired: PropTypes.bool,
  handleName: PropTypes.string,
};
TextInput.defaultProps = {
  kind: 'fullborder',
  inputDiabled: false,
  titleBackground: '#05052d',
  inputHeight: '50px',
  textarea: false,
  handleOnChange: () => false,
  isRequired: false,
  handleName: '',
};

export default TextInput;
