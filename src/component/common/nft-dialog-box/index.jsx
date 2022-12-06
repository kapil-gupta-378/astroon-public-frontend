import React from 'react';
import Image from 'next/image';
import TextInput from '../text-input';
import FormSelect from '../form-select';
import styles from './nftDialogBox.module.scss';
import defaultProfileImage from '../../../../public/assets/images/Dummy_Image.svg';

const NFTDialogBox = ({
  leftBlogButtonHandler,
  rightBlogButtonHandler,
  handleShow,
  showNFT,
  finalData,
  inputValue,
  onChangeInput,
  categorySelectOptions,
  setCategory,
  handleSubmit,
}) => {
  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

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
                    loader={ImageLoader}
                    src={
                      finalData.image_thumbnail_url
                        ? finalData.image_thumbnail_url
                        : defaultProfileImage
                    }
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
                        handleValue={finalData.name}
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
                        handleValue={finalData.ether_price}
                        title="Price"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className={styles.input_wrap}>
                      <FormSelect
                        titleBackground={'#AF3277'}
                        label={'Category'}
                        options={categorySelectOptions}
                        handleChange={(value) => setCategory(value.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className={styles.input_wrap}>
                      <TextInput
                        titleBackground={'#AF3277'}
                        handleType={'text'}
                        kind="fullborder"
                        handleValue={finalData.dollar_price}
                        title="Price in USD"
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
                    onClick={() => handleSubmit()}
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
