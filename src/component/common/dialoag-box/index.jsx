import Image from 'next/image';
import React from 'react';
import TextInput from '../text-input';
import styles from './dialogBox.module.scss';
import crossIcon from '../../../../public/assets/images/crossIcon.svg';
import PropTypes from 'prop-types';

const DialogBox = ({
  mainHading,
  content,
  leftButtonHandler,
  rightButtonHandler,
  leftButtonName,
  rightButtonName,
  handleShow,
  inputValue,
  onChangeInput,
  children,
  closeButtonHandler,
}) => {
  return (
    <div className="dialog_box">
      {handleShow && (
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            {closeButtonHandler && (
              <button
                className={styles.cross_close_btn}
                onClick={closeButtonHandler}
              >
                <Image src={crossIcon} width={10} height={10} alt="crossIcon" />
              </button>
            )}
            <div className={styles.modal_header}>
              {mainHading && (
                <h5 className={styles.dailog_title}>{mainHading}</h5>
              )}
            </div>
            {content && <p className={styles.dialog_body}>{content}</p>}
            {children && <div className={styles.dialog_body}>{children}</div>}
            {inputValue !== undefined && (
              <div className={styles.input_wrap}>
                <TextInput
                  titleBackground={'#AF3277'}
                  title={'Comment'}
                  handleType={'text'}
                  kind="fullborder"
                  placeHolder="Add Comment"
                  handleValue={inputValue}
                  handleOnChange={(e) => onChangeInput(e.target.value)}
                />
              </div>
            )}
            <div className={styles.dialog_footer}>
              {leftButtonName && (
                <button
                  onClick={leftButtonHandler}
                  type="button"
                  className={styles.dialog_left_btn}
                >
                  {leftButtonName}
                </button>
              )}
              {rightButtonName && (
                <button
                  onClick={rightButtonHandler}
                  type="button"
                  className={styles.dialog_right_btn}
                >
                  {rightButtonName}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DialogBox.defaultProps = {
  height: 'auto',
};

DialogBox.propTypes = {
  mainHading: PropTypes.string,
  content: PropTypes.element,
  leftButtonHandler: PropTypes.func,
  rightButtonHandler: PropTypes.func,
  leftButtonName: PropTypes.string,
  rightButtonName: PropTypes.string,
  handleShow: PropTypes.func,
  inputValue: PropTypes.any,
  onChangeInput: PropTypes.func,
  children: PropTypes.element,
  closeButtonHandler: PropTypes.func,
};

export default DialogBox;
