import React from 'react';
import styles from './gamesDialogBox.module.scss';
import TextInput from '../text-input';

const GamesDialogBox = ({
  leftBlogButtonHandler,
  rightBlogButtonHandler,
  handleShow,
  playStoreURL,
  setPlayStoreURL,
  appStoreURL,
  setAppStoreURL,
  isUpdateBTN,
}) => {
  return (
    <div className="dialog_box">
      {handleShow && (
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>
              <h5 className={styles.dailog_title}>Enter games app url</h5>
            </div>
            <p className={styles.dialog_body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac
              nibh ut in. Convallis in tristique dui sit vestibulum habitant
            </p>
            <div className="row">
              <div className="col-lg-12">
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground="rgb(175, 50, 119)"
                    title={'Play Store URL'}
                    handleType={'text'}
                    kind="fullborder"
                    placeHolder="Enter URL"
                    handleValue={playStoreURL}
                    handleOnChange={(e) => setPlayStoreURL(e.target.value)}
                  />
                </div>
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground="rgb(175, 50, 119)"
                    title={'App Store URL'}
                    handleType={'text'}
                    kind="fullborder"
                    placeHolder="Enter URL"
                    handleValue={appStoreURL}
                    handleOnChange={(e) => setAppStoreURL(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.dialog_footer}>
              <button
                onClick={() => leftBlogButtonHandler()}
                type="button"
                className={styles.dialog_left_btn}
              >
                Cancel
              </button>
              {isUpdateBTN ? (
                <button
                  onClick={() => rightBlogButtonHandler()}
                  type="button"
                  className={styles.dialog_right_btn}
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => rightBlogButtonHandler()}
                  type="button"
                  className={styles.dialog_right_btn}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesDialogBox;
