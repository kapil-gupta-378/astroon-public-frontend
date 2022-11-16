import React from 'react';
import Image from 'next/image';
import TextInput from '../text-input';
import styles from './nftDialogBox.module.scss';

const NFTDialogBox = ({
  leftBlogButtonHandler,
  rightBlogButtonHandler,
  handleShow,
  showNFT,
  inputValue,
  onChangeInput,
}) => {
  return (
    <div className="dialog_box">
      {handleShow && (
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            <div className={styles.modal_header}>
              <h5 className={styles.dailog_title}>Enter Opensea Link</h5>
            </div>
            <p className={styles.dialog_body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac
              nibh ut in. Convallis in tristique dui sit vestibulum habitant
            </p>
            <div className="row">
              <div className="col-lg-12">
                <div className={styles.input_wrap}>
                  <TextInput
                    titleBackground={'#AF3277'}
                    handleType={'text'}
                    kind="fullborder"
                    title="Enter Opensea Link"
                    handleValue={inputValue}
                    handleOnChange={(e) => onChangeInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.dialog_footer}>
              <button
                onClick={() => rightBlogButtonHandler()}
                type="button"
                className={styles.dialog_right_btn}
              >
                Validate
              </button>
            </div>
            {showNFT && (
              <div className={styles.nft_submit_frm}>
                <div className={`row ${styles.attachment}`}>
                  <Image
                    src={'/assets/images/card_avatar.svg'}
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
                        handleValue={''}
                        title="Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className={styles.input_wrap}>
                      <TextInput
                        titleBackground={'#AF3277'}
                        handleType={'text'}
                        kind="fullborder"
                        handleValue={''}
                        title="Price"
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
                        handleValue={''}
                        title="Category"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className={styles.input_wrap}>
                      <TextInput
                        titleBackground={'#AF3277'}
                        handleType={'text'}
                        kind="fullborder"
                        handleValue={''}
                        title="Price in USD"
                      />
                    </div>
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
                  <button
                    onClick={() => rightBlogButtonHandler()}
                    type="button"
                    className={styles.dialog_right_btn}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTDialogBox;
