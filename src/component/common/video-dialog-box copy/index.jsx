import React from 'react';
import styles from './videoDialogBox.module.scss';
import FormSelect from '../form-select';
import inputStyles from '../text-input/textInput.module.scss';
import TextInput from '../text-input';

const VideoDialogBox = ({
  leftBlogButtonHandler,
  rightBlogButtonHandler,
  handleShow,
  selectOption,
  onChangeSelect,
  videoAttachment,
  uploadVideoAttachment,
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
              <h5 className={styles.dailog_title}>Select page with videos</h5>
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
                <div className={inputStyles.input_wrap}>
                  <div
                    className={inputStyles.corner_border_label}
                    style={{ background: 'rgb(175, 50, 119)' }}
                  >
                    <label>Video</label>
                  </div>

                  <div
                    style={{
                      padding: 0,
                      width: '100%',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'inline-block',
                    }}
                    className={inputStyles.full_border}
                  >
                    <div
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p
                        style={{
                          cursor: 'pointer',
                          marginBottom: 0,
                          padding: '8px',
                          opacity: '0.5',
                        }}
                      >
                        {videoAttachment
                          ? videoAttachment.name
                          : 'select video'}
                      </p>
                      <h6
                        style={{
                          background:
                            'linear-gradient(141.07deg, #FAFF00 -6.88%, #FE19C1 50.39%)',
                          float: 'right',
                          padding: '14px 30px',
                          marginBottom: 0,
                          cursor: 'pointer',
                        }}
                      >
                        {videoAttachment ? 'Change Video' : 'Upload Video'}
                      </h6>
                    </div>
                    <input
                      style={{
                        height: '47px',
                        cursor: 'pointer',
                        fontSize: '100px',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        opacity: 0,
                      }}
                      type="file"
                      className={inputStyles.full_border}
                      placeholder="Upload Video"
                      onChange={uploadVideoAttachment}
                      accept="video/*"
                    />
                  </div>
                </div>
                <p style={{ textAlign: 'center', color: 'white' }}>or</p>
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
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDialogBox;
