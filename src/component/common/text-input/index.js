import React, { useRef, useState } from 'react';
import styles from './textInput.module.scss';
import PropTypes from 'prop-types';
import Image from 'next/image';
import passwordShowIcon from '../../../../public/assets/images/eyeIcon.svg';
import passwordhideIcon from '../../../../public/assets/images/eyeHideIcon.svg';
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
  ...props
}) => {
  const [inputType, setInputType] = useState(handleType);
  const inputRef = useRef();
  const showPassword = () => {
    if (inputRef.current.type === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };
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
          {...props}
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
        <div>
          <input
            {...props}
            ref={inputRef}
            name={handleName}
            required={isRequired}
            style={{ height: inputHeight }}
            disabled={inputDiabled}
            type={inputType}
            value={handleValue}
            onChange={handleOnChange}
            className={`${
              kind === 'cornerborder'
                ? styles.corner_border
                : styles.full_border
            }`}
            placeholder={placeHolder}
          />
          {handleType === 'password' && (
            <div onClick={showPassword} className={styles.showHideIcon}>
              <Image
                src={
                  inputType === 'password' ? passwordShowIcon : passwordhideIcon
                }
                width={15}
                height={15}
                layout="fixed"
                alt={'showpass'}
              />
            </div>
          )}
        </div>
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
