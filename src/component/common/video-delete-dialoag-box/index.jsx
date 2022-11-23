import Image from 'next/image';
import React from 'react';
import styles from './videoDeleteDialogBox.module.scss';
import crossIcon from '../../../../public/assets/images/crossIcon.svg';
const VideoDeleteDialogBox = ({
  mainHading,
  content,
  leftButtonHandler,
  rightButtonHandler,
  leftButtonName,
  rightButtonName,
  handleShow,
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
            <p className={styles.dialog_body}>{content}</p>
            <div className={styles.dialog_body}>{children}</div>
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

export default VideoDeleteDialogBox;
