import React from 'react';
import TextInput from '../text-input';
import styles from './dialogBox.module.scss';
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
}) => {
  return (
    <div className="dialog_box">
      {handleShow && (
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>
              {mainHading && (
                <h5 className={styles.dailog_title}>{mainHading}</h5>
              )}
            </div>
            {content && <p className={styles.dialog_body}>{content}</p>}
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

export default DialogBox;
