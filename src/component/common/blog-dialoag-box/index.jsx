import React from 'react';
import TextInput from '../text-input';
import styles from './blogDialogBox.module.scss';
const BlogDialogBox = ({
  leftBlogButtonHandler,
  rightBlogButtonHandler,
  handleFilterBlogShow,
  startDatevalue,
  endDatevalue,
  setStartDate,
  setEndDate,
}) => {
  return (
    <div className="dialog_box">
      {handleFilterBlogShow && (
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>
              <h5 className={styles.dailog_title}>You Can apply filter</h5>
            </div>
            <p className={styles.dialog_body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac
              nibh ut in. Convallis in tristique dui sit vestibulum habitant
            </p>
            <div className={styles.input_wrap}>
              <TextInput
                titleBackground={'#AF3277'}
                handleType="date"
                kind="fullborder"
                placeHolder="Start Date"
                handleValue={startDatevalue}
                handleOnChange={(e) => setStartDate(e.target.value)}
                title="Start date"
              />
            </div>
            <div className={styles.input_wrap}>
              <TextInput
                titleBackground={'#AF3277'}
                handleType="date"
                kind="fullborder"
                placeHolder="End Date"
                handleValue={endDatevalue}
                handleOnChange={(e) => setEndDate(e.target.value)}
                title="End date"
              />
            </div>
            <div className={styles.dialog_footer}>
              <button
                onClick={leftBlogButtonHandler}
                type="button"
                className={styles.dialog_left_btn}
              >
                Cancel
              </button>
              <button
                onClick={rightBlogButtonHandler}
                type="button"
                className={styles.dialog_right_btn}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDialogBox;
