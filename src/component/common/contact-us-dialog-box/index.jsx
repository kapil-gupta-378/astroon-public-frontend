import React from 'react';
import TextInput from '../text-input';
import styles from './contactUsBlogBox.module.scss';
import Image from 'next/image';
const ContactUsDialogBox = ({
  leftBlogButtonHandler,
  rightBlogButtonHandler,
  handleShow,
  finalData,
}) => {
  return (
    <div className="dialog_box">
      {handleShow && (
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>
              <h5 className={styles.dailog_title}>You Can apply filter</h5>
            </div>
            <p className={styles.dialog_body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac
              nibh ut in. Convallis in tristique dui sit vestibulum habitant
            </p>
            <div className={`row ${styles.attachment}`}>
              <Image
                src={finalData.attachments}
                // src={'/assets/images/card_avatar.svg'}
                height={100}
                width={100}
                layout="fixed"
                id="attachment_id"
                alt=""
              />
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground={'#AF3277'}
                    handleType={'text'}
                    kind="fullborder"
                    handleValue={finalData.email}
                    title="Email Address"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground={'#AF3277'}
                    handleType={'text'}
                    kind="fullborder"
                    handleValue={finalData.username}
                    title="Username"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground={'#AF3277'}
                    handleType={'text'}
                    kind="fullborder"
                    handleValue={finalData.reasonForContact}
                    title="Reason for Contact"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground={'#AF3277'}
                    handleType={'text'}
                    kind="fullborder"
                    handleValue={finalData.subject}
                    title="Subject"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground={'#AF3277'}
                    handleType={'text'}
                    kind="fullborder"
                    handleValue={finalData.subject}
                    title="Subject"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground={'#AF3277'}
                    handleType={'text'}
                    kind="fullborder"
                    handleValue={finalData.description}
                    title="Description"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className={styles.text_msg}>
                <h5>Messages</h5>
                {finalData.replies.length !== 0 ? (
                  finalData.replies.splice(0, 1).map((reply, idx) => {
                    return (
                      <div key={idx} className="col-12">
                        <li>{reply.description}</li>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-12">
                    <li>NA</li>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.dialog_footer}>
              <button
                onClick={leftBlogButtonHandler}
                type="button"
                className={styles.dialog_left_btn}
              >
                Cancel
              </button>
              {finalData.status !== 'replied' && (
                <button
                  onClick={() => rightBlogButtonHandler(finalData.id)}
                  type="button"
                  className={styles.dialog_right_btn}
                >
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUsDialogBox;
