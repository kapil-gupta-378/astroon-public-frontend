import React from 'react';
import styles from './updateVideoDialogBox.module.scss';
import FormSelect from '../form-select';
import TextInput from '../text-input';

const UpdateVideoDialogBox = ({
  leftBlogButtonHandler,
  rightBlogButtonHandler,
  handleShow,
  selectOption,
  onChangeSelect,
  videoAttachmentURL,
  setVideoAttachmentURL,
  getPage,
}) => {
  return (
    <div className="dialog_box">
      {handleShow && (
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>
              <h5 className={styles.dailog_title}>Update page with videos</h5>
            </div>
            <p className={styles.dialog_body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac
              nibh ut in. Convallis in tristique dui sit vestibulum habitant
            </p>
            <div className="row">
              <div className="col-lg-12">
                <div className={styles.input_wrap}>
                  <FormSelect
                    selectedOption={getPage}
                    titleBackground="rgb(175, 50, 119)"
                    label={'Page'}
                    options={selectOption}
                    handleChange={(value) => onChangeSelect(value.value)}
                  />
                </div>
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground="rgb(175, 50, 119)"
                    title={'Paste Video URL'}
                    handleType={'text'}
                    kind="fullborder"
                    placeHolder="Enter video link"
                    handleValue={videoAttachmentURL}
                    handleOnChange={(e) =>
                      setVideoAttachmentURL(e.target.value)
                    }
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
              <button
                onClick={() => rightBlogButtonHandler()}
                type="button"
                className={styles.dialog_right_btn}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVideoDialogBox;
