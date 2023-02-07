import React from 'react';
import TextInput from '../text-input';
import styles from './replyDialogBox.module.scss';
const ReplyDialogBox = ({
  leftReplyButtonHandler,
  rightReplyButtonHandler,
  handleReplyShow,
  reply,
  setReply,
  loading,
}) => {
  return (
    <div className="dialog_box">
      {handleReplyShow && (
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>
              <h5 className={styles.dailog_title}>You Can Comment</h5>
            </div>
            <p className={styles.dialog_body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac
              nibh ut in. Convallis in tristique dui sit vestibulum habitant
            </p>
            <div className={styles.input_wrap}>
              <TextInput
                titleBackground={'#AF3277'}
                handleType={'text'}
                kind="fullborder"
                handleValue={reply}
                handleOnChange={(e) => setReply(e.target.value)}
                title="Reply"
              />
            </div>
            <div className={styles.dialog_footer}>
              <button
                onClick={leftReplyButtonHandler}
                type="button"
                className={styles.dialog_left_btn}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={rightReplyButtonHandler}
                type="button"
                className={styles.dialog_right_btn}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplyDialogBox;
